package com.windowsazure.messaging.nhsharding;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;

import com.windowsazure.messaging.CollectionResult;
import com.windowsazure.messaging.INotificationHub;
import com.windowsazure.messaging.Notification;
import com.windowsazure.messaging.NotificationHub;
import com.windowsazure.messaging.Registration;

/**
 * @author Elio Damaggio
 * 
 *         This class is meant to be a singleton.
 */
public class ShardedNotificationHubClient implements INotificationHub {

	private static final int MAX_TOP = 100;

	private Random random = new Random();

	private INHConfiguration configuration;

	Map<Integer, INotificationHub> hubs = new TreeMap<Integer, INotificationHub>();

	public ShardedNotificationHubClient(INHConfiguration configuration) {
		this.configuration = configuration;

		for (Integer shard : configuration.getHubConnectionStrings().keySet()) {
			hubs.put(
					shard,
					createNotificationHubClient(configuration
							.getHubConnectionStrings().get(shard),
							configuration.getHubNames().get(shard)));
		}
	}

	public ShardedNotificationHubClient(INHConfiguration configuration,
			Map<Integer, INotificationHub> hubs) {
		this.configuration = configuration;
		this.hubs = hubs;
	}

	protected INotificationHub createNotificationHubClient(
			String hubConnectionString, String hubName) {
		return new NotificationHub(hubConnectionString, hubName);
	}

	@Override
	public Registration createRegistration(Registration registration) {
		ShardedNHRegistrationId regId = createNewShardedId();
		Registration intraHubReg = (Registration) registration.clone();
		intraHubReg.setRegistrationId(regId.getRegistrationId());
		Registration returned = hubs.get(regId.getShard()).createRegistration(
				intraHubReg);
		returned.setRegistrationId(new ShardedNHRegistrationId(
				regId.getShard(), regId.getRegistrationId()).toString());
		return returned;
	}

	@Override
	public String createRegistrationId() {
		return createNewShardedId().toString();
	}

	private ShardedNHRegistrationId createNewShardedId() {
		int shard = getRandomAvailableShard();
		String intraId = hubs.get(shard).createRegistrationId();
		return new ShardedNHRegistrationId(shard, intraId);
	}

	private int getRandomAvailableShard() {
		List<Integer> availableHubs = configuration.getHubsWithFreeSpace();
		return availableHubs.get(random.nextInt(availableHubs.size()))
				.intValue();
	}

	@Override
	public void deleteRegistration(Registration registration) {
		deleteRegistration(registration.getRegistrationId());
	}

	@Override
	public void deleteRegistration(String registrationId) {
		ShardedNHRegistrationId regId = new ShardedNHRegistrationId(
				registrationId);
		hubs.get(regId.getShard())
				.deleteRegistration(regId.getRegistrationId());
	}

	@Override
	public Registration getRegistration(String registrationId) {
		ShardedNHRegistrationId regId = new ShardedNHRegistrationId(
				registrationId);
		Registration intraHubReg = hubs.get(regId.getShard()).getRegistration(
				regId.getRegistrationId());
		intraHubReg.setRegistrationId(regId.toString());
		return intraHubReg;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.windowsazure.messaging.INotificationHub#getRegistrations()
	 */
	@Override
	public CollectionResult getRegistrations() {
		return getRegistrations(-1, null);
	}

	@Override
	public CollectionResult getRegistrations(int top, String continuationToken) {
		return executeShardedQuery(top, continuationToken, new IExecuteQueryOnHub() {
			@Override
			public CollectionResult executeQueryOnHub(INotificationHub hub, int top, String continuationToken) {
				return hub.getRegistrations(top, continuationToken);
			}
		});
	}

	private CollectionResult executeShardedQuery(int top,
			String continuationToken, IExecuteQueryOnHub ex) {
		CollectionResult result = new CollectionResult();
		ShardedContinuationToken shardedContinuation = continuationToken == null ? getDefaultContinuationToken() : new ShardedContinuationToken(continuationToken);
		
		int toFill = top>0 && top <=100 ? top : MAX_TOP;
		for (Integer shard : hubs.keySet()) {
			// skips already processed shards
			if (shard < shardedContinuation.getShard()) continue;
			
			if (toFill <= 0) {
				// In this case, finished filling the result exactly when a shard is depleted.
				// resume from this shard with continuation token = null
				result.setContinuationToken(new ShardedContinuationToken(shard, null).toString());
				return result;
			}
			
			// if this is the first hub in the sharded continuation token, continue from where left
			String intraHubContinuationToken = null;
			if (shard == shardedContinuation.getShard())
				intraHubContinuationToken = shardedContinuation.getContinuationToken();			
			
			CollectionResult partial = ex.executeQueryOnHub(hubs.get(shard), toFill, intraHubContinuationToken);
			
			copyPartialsInResults(shard, result, partial);
			
			String continuation = partial.getContinuationToken();
			if (continuation != null) {
				result.setContinuationToken(new ShardedContinuationToken(shard, continuation).toString());
				return result;
			}
			
			toFill -= partial.getRegistrations().size();
		}
		
		// no more hubs, no continuation token, and still space in return registration
		return result;
	}
	
	private void copyPartialsInResults(Integer shard, CollectionResult result,
			CollectionResult partial) {
		for (Registration r : partial.getRegistrations()) {
			ShardedNHRegistrationId shardedId = new ShardedNHRegistrationId(
					shard, r.getRegistrationId());
			r.setRegistrationId(shardedId.toString());
			result.getRegistrations().add(r);
		}
	}

	private ShardedContinuationToken getDefaultContinuationToken() {
		// this continuation token starts from the first hub with no intraHub continuationtoken.
		return new ShardedContinuationToken(hubs.keySet().iterator().next(), null);
	}
	
	private interface IExecuteQueryOnHub {
		CollectionResult executeQueryOnHub(INotificationHub hub, int top, String continuationToken);
	}

	@Override
	public CollectionResult getRegistrationsByChannel(String channel) {
		return getRegistrationsByChannel(channel, -1, null);
	}

	@Override
	public CollectionResult getRegistrationsByChannel(final String channel, int top,
			String continuationToken) {
		return executeShardedQuery(top, continuationToken, new IExecuteQueryOnHub() {
			@Override
			public CollectionResult executeQueryOnHub(INotificationHub hub, int top, String continuationToken) {
				return hub.getRegistrationsByChannel(channel, top, continuationToken);
			}
		});
	}

	@Override
	public CollectionResult getRegistrationsByTag(String tag) {
		return getRegistrationsByTag(tag, -1, null);
	}

	@Override
	public CollectionResult getRegistrationsByTag(final String tag, int top,
			String continuationToken) {
		return executeShardedQuery(top, continuationToken, new IExecuteQueryOnHub() {
			@Override
			public CollectionResult executeQueryOnHub(INotificationHub hub, int top, String continuationToken) {
				return hub.getRegistrationsByTag(tag, top, continuationToken);
			}
		});
	}

	@Override
	public void sendNotification(Notification notification) {
		for (INotificationHub hub : hubs.values()) {
			hub.sendNotification(notification);
		}
	}

	@Override
	public void sendNotification(Notification notification, Set<String> tags) {
		for (INotificationHub hub : hubs.values()) {
			hub.sendNotification(notification, tags);
		}
	}

	@Override
	public void sendNotification(Notification notification, String tagExpression) {
		for (INotificationHub hub : hubs.values()) {
			hub.sendNotification(notification, tagExpression);
		}
	}

	@Override
	public Registration updateRegistration(Registration registration) {
		ShardedNHRegistrationId regId = new ShardedNHRegistrationId(
				registration.getRegistrationId());
		Registration intraHubReg = (Registration) registration.clone();
		intraHubReg.setRegistrationId(regId.getRegistrationId());
		Registration returned = hubs.get(regId.getShard()).updateRegistration(
				intraHubReg);
		returned.setRegistrationId(new ShardedNHRegistrationId(
				regId.getShard(), regId.getRegistrationId()).toString());
		return returned;
	}

	@Override
	public Registration upsertRegistration(Registration registration) {
		ShardedNHRegistrationId regId = new ShardedNHRegistrationId(
				registration.getRegistrationId());
		Registration intraHubReg = (Registration) registration.clone();
		intraHubReg.setRegistrationId(regId.getRegistrationId());
		Registration returned = hubs.get(regId.getShard()).upsertRegistration(
				intraHubReg);
		returned.setRegistrationId(new ShardedNHRegistrationId(
				regId.getShard(), regId.getRegistrationId()).toString());
		return returned;
	}
	

	private class ShardedContinuationToken {
		private static final String SHARDED_CONTINUATIONTOKEN_SEPARATOR = "_Shard_";

		private int shard;
		private String continuationToken;

		public int getShard() {
			return shard;
		}

		public String getContinuationToken() {
			return continuationToken;
		}

		public ShardedContinuationToken(int shard, String continuationToken) {
			super();
			this.shard = shard;
			this.continuationToken = continuationToken;
		}

		public ShardedContinuationToken(String shardedContinuationToken) {
			String[] split = shardedContinuationToken
					.split(SHARDED_CONTINUATIONTOKEN_SEPARATOR);

			if (split.length < 1 || split.length > 2) {
				throw new IllegalArgumentException(
						"Illegal continuation token: "
								+ shardedContinuationToken);
			}

			this.shard = Integer.parseInt(split[0]);
			
			if (split.length == 2) {
				this.continuationToken = split[1];
			}
		}

		@Override
		public String toString() {
			return shard + SHARDED_CONTINUATIONTOKEN_SEPARATOR
					+ ( continuationToken != null ? continuationToken : "") ;
		}
	}

}
