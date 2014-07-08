package com.windowsazure.messaging.nhsharding;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;

import org.junit.BeforeClass;
import org.junit.Test;

import com.windowsazure.messaging.AppleRegistration;
import com.windowsazure.messaging.CollectionResult;
import com.windowsazure.messaging.INotificationHub;
import com.windowsazure.messaging.Notification;
import com.windowsazure.messaging.Registration;

public class ShardedNotificationHubClientTest {
	private static INHConfiguration configuration;
	
	@BeforeClass
	public static void setUp() throws IOException {
		configuration = new NHConfigurationFromProperties("/shardConfigurationTest.properties");
	}

	@Test
	public void testCreateRegistrationId() {
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			when(mock.createRegistrationId()).thenReturn("id_"+i);
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		
		String stringId = shardedHub.createRegistrationId();
		
		ShardedNHRegistrationId shardedId = new ShardedNHRegistrationId(stringId);
		
		assertTrue(configuration.getHubsWithFreeSpace().contains(shardedId.getShard()));
		assertEquals("id_"+shardedId.getShard(), shardedId.getRegistrationId());
	}
	
	@Test
	public void testUpsertRegistration() {
		int shard = 2;
		ShardedNHRegistrationId shardedId = new ShardedNHRegistrationId(shard, "id_"+shard);
		Registration reg = new AppleRegistration("ABCDEF");
		reg.setRegistrationId(shardedId.toString());
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (i == shard) {
				// create intraHubRegistration
				Registration intraHub = reg.clone();
				intraHub.setRegistrationId(shardedId.getRegistrationId());
				when(mock.upsertRegistration(intraHub)).thenReturn(intraHub);
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		
		Registration returned = shardedHub.upsertRegistration(reg);
		
		assertEquals(returned, reg);
		
		for (int i=1; i<=shards;i++) {
			if (i == shard) {
				// this is the registration that as to be upserted on the hub
				Registration reg2 = new AppleRegistration("ABCDEF");
				reg2.setRegistrationId(shardedId.getRegistrationId());
				
				verify(hubMocks.get(shard)).upsertRegistration(reg2);
			}
			verifyZeroInteractions(hubMocks.get(i));
		}
	}
	
	@Test
	public void testUpdateRegistration() {
		int shard = 2;
		ShardedNHRegistrationId shardedId = new ShardedNHRegistrationId(shard, "id_"+shard);
		Registration reg = new AppleRegistration("ABCDEF");
		reg.setRegistrationId(shardedId.toString());
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (i == shard) {
				// create intraHubRegistration
				Registration intraHub = reg.clone();
				intraHub.setRegistrationId(shardedId.getRegistrationId());
				when(mock.updateRegistration(intraHub)).thenReturn(intraHub);
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		
		Registration returned = shardedHub.updateRegistration(reg);
		
		assertEquals(returned, reg);
		
		for (int i=1; i<=shards;i++) {
			if (i == shard) {
				// this is the registration that as to be upserted on the hub
				Registration reg2 = new AppleRegistration("ABCDEF");
				reg2.setRegistrationId(shardedId.getRegistrationId());
				
				verify(hubMocks.get(shard)).updateRegistration(reg2);
			}
			verifyZeroInteractions(hubMocks.get(i));
		}
	}
	
	@Test
	public void testGetRegistration() {
		int shard = 2;
		ShardedNHRegistrationId shardedId = new ShardedNHRegistrationId(shard, "id_"+shard);
		Registration reg = new AppleRegistration("ABCDEF");
		reg.setRegistrationId(shardedId.toString());
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			when(mock.getRegistration(shardedId.getRegistrationId())).thenReturn(reg);
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		Registration returnedReg = shardedHub.getRegistration(shardedId.toString());
		
		assertEquals(reg, returnedReg);
		
		for (int i=1; i<=shards;i++) {
			if (i == shard) {
				verify(hubMocks.get(shard)).getRegistration(shardedId.getRegistrationId());
			}
			verifyNoMoreInteractions(hubMocks.get(i));
		}
	}
	
	@Test
	public void sendNotification() {
		Notification notification = Notification.createAppleNotifiation("{\"aps\": {\"alert\":\"Hello!\"}}");
		String tagExpression = "foo && bar";
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		shardedHub.sendNotification(notification, tagExpression);
		
		for (int i=1; i<=shards;i++) {
			verify(hubMocks.get(i)).sendNotification(notification, tagExpression);
		}
	}

	@Test
	public void testGetRegistrationsFromOneNoContInNoContOut() {
		int shardToReadFirst = 1;
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				when(mock.getRegistrations(2, null)).thenReturn(result);
			}
			when(mock.getRegistrations(1, null)).thenReturn(new CollectionResult());
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		CollectionResult result = shardedHub.getRegistrations(2, null);
		
		assertNull(result.getContinuationToken());
		assertEquals(1, result.getRegistrations().size());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(1, "regId").toString(), "ABCDEF"), result.getRegistrations().iterator().next());
				
		for (int i=1; i<=shards;i++) {
			if (i == shardToReadFirst) {
				verify(hubMocks.get(shardToReadFirst)).getRegistrations(2, null);
			} else {
				verify(hubMocks.get(i)).getRegistrations(1, null);
			}
		}
	}
	
	@Test
	public void testGetRegistrationsFromOneNoContInContOut() {
		int shardToReadFirst = 2;
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (i < shardToReadFirst) {
				when(mock.getRegistrations(2, null)).thenReturn(new CollectionResult());
			}
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				result.setContinuationToken("continuation");
				when(mock.getRegistrations(2, null)).thenReturn(result);
			}
			if (i > shardToReadFirst) {
				when(mock.getRegistrations(1, null)).thenReturn(new CollectionResult());
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		CollectionResult result = shardedHub.getRegistrations(2, null);
		
		assertEquals("2_Shard_continuation", result.getContinuationToken());
		assertEquals(1, result.getRegistrations().size());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(2, "regId").toString(), "ABCDEF"), result.getRegistrations().iterator().next());
				
		for (int i=1; i<=shards;i++) {
			if (i < shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(2, null);
			}
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(2, null);
			}
			if (i > shardToReadFirst) {
				verifyZeroInteractions(hubMocks.get(i));
			}
		}
	}
	
	@Test
	public void testGetRegistrationsFromOneNoContInEdgeContOut() {
		int shardToReadFirst = 2;
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (i < shardToReadFirst) {
				when(mock.getRegistrations(1, null)).thenReturn(new CollectionResult());
			}
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				when(mock.getRegistrations(1, null)).thenReturn(result);
			}
			if (i > shardToReadFirst) {
				when(mock.getRegistrations(1, null)).thenReturn(new CollectionResult());
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		CollectionResult result = shardedHub.getRegistrations(1, null);
		
		assertEquals("3_Shard_", result.getContinuationToken());
		assertEquals(1, result.getRegistrations().size());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(2, "regId").toString(), "ABCDEF"), result.getRegistrations().iterator().next());
				
		for (int i=1; i<=shards;i++) {
			if (i < shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(1, null);
			}
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(1, null);
			}
			if (i > shardToReadFirst) {
				verifyZeroInteractions(hubMocks.get(i));
			}
		}
	}
	
	@Test
	public void testGetRegistrationsFromOneContInNoContOut() {
		int shardToReadFirst = 1;
		String intraHubContinuation = "continuation";
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				when(mock.getRegistrations(2, intraHubContinuation)).thenReturn(result);
			} else {
				when(mock.getRegistrations(1, null)).thenReturn(new CollectionResult());
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		
		String shardedContinuationToken = shardToReadFirst+"_Shard_"+intraHubContinuation;
		CollectionResult result = shardedHub.getRegistrations(2, shardedContinuationToken);
		
		assertNull(result.getContinuationToken());
		assertEquals(1, result.getRegistrations().size());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(1, "regId").toString(), "ABCDEF"), result.getRegistrations().iterator().next());
				
		for (int i=1; i<=shards;i++) {
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(2, intraHubContinuation);
			} else {
				verify(hubMocks.get(i)).getRegistrations(1, null);
			}
		}
	}
	
	@Test
	public void testGetRegistrationsFromOneEdgeContInNoContOut() {
		int shardToReadFirst = 2;
		String intraHubContinuation = "continuation";
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				when(mock.getRegistrations(2, intraHubContinuation)).thenReturn(result);
			}
			if (i > shardToReadFirst) {
				when(mock.getRegistrations(1, null)).thenReturn(new CollectionResult());
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		String shardedContinuation = shardToReadFirst + "_Shard_" + intraHubContinuation;
		CollectionResult result = shardedHub.getRegistrations(2, shardedContinuation);
		
		assertNull(result.getContinuationToken());
		assertEquals(1, result.getRegistrations().size());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(2, "regId").toString(), "ABCDEF"), result.getRegistrations().iterator().next());
				
		for (int i=1; i<=shards;i++) {
			if (i < shardToReadFirst) {
				verifyZeroInteractions(hubMocks.get(i));
			}
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(2, intraHubContinuation);
			}
			if (i > shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(1, null);
			}
		}
	}
	
	@Test
	public void testGetRegistrationsFromOneContInEdgeContOut() {
		int shardToReadFirst = 1;
		String intraHubContinuation = "continuation";
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				when(mock.getRegistrations(1, intraHubContinuation)).thenReturn(result);
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		
		String shardedContinuationToken = shardToReadFirst+"_Shard_"+intraHubContinuation;
		CollectionResult result = shardedHub.getRegistrations(1, shardedContinuationToken);
		
		assertEquals("2_Shard_", result.getContinuationToken());
		assertEquals(1, result.getRegistrations().size());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(1, "regId").toString(), "ABCDEF"), result.getRegistrations().iterator().next());
				
		for (int i=1; i<=shards;i++) {
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(1, intraHubContinuation);
			} else {
				verifyZeroInteractions(hubMocks.get(i));
			}
		}
	}
	
	@Test
	public void testGetRegistrationsFromOneEdgeContInContOut() {
		int shardToReadFirst = 3;
		String returnedContinuation = "continuation";
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				result.setContinuationToken(returnedContinuation);
				when(mock.getRegistrations(1, null)).thenReturn(result);
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		
		String shardedContinuationToken = shardToReadFirst+"_Shard_";
		CollectionResult result = shardedHub.getRegistrations(1, shardedContinuationToken);
		
		assertEquals(shardToReadFirst+"_Shard_"+returnedContinuation, result.getContinuationToken());
		assertEquals(1, result.getRegistrations().size());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(3, "regId").toString(), "ABCDEF"), result.getRegistrations().iterator().next());
				
		for (int i=1; i<=shards;i++) {
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrations(1, null);
			} else {
				verifyZeroInteractions(hubMocks.get(i));
			}
		}
	}

	@Test
	public void testGetRegistrationsByTagFromTwoNoContInContOut() {
		int shardToReadFirst = 1;
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				when(mock.getRegistrationsByTag("tag", 2, null)).thenReturn(result);
			}
			if (shardToReadFirst + 1 == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId2", "ABCDEF2"));
				result.setContinuationToken("continuation");
				when(mock.getRegistrationsByTag("tag", 1, null)).thenReturn(result);
			}
			if (i > shardToReadFirst + 1) {
				when(mock.getRegistrationsByTag("tag", 1, null)).thenReturn(new CollectionResult());
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		CollectionResult result = shardedHub.getRegistrationsByTag("tag", 2, null);
		
		assertEquals("2_Shard_continuation", result.getContinuationToken());
		assertEquals(2, result.getRegistrations().size());
		Iterator<Registration> it = result.getRegistrations().iterator();
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(1, "regId").toString(), "ABCDEF"), it.next());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(2, "regId2").toString(), "ABCDEF2"), it.next());
		
		
		for (int i=1; i<=shards;i++) {
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrationsByTag("tag", 2, null);
			}
			if (i == shardToReadFirst +1 ) {
				verify(hubMocks.get(i)).getRegistrationsByTag("tag", 1, null);
			}
			if (i > shardToReadFirst + 1) {
				verifyZeroInteractions(hubMocks.get(i));
			}
		}
	}
	
	@Test
	public void testGetRegistrationsByChannelFromTwoContInNoContOut() {
		int shardToReadFirst = 2;
		String intraHubContinuation = "continuation";
		
		Map<Integer, INotificationHub> hubMocks = new TreeMap<Integer, INotificationHub>();
		int shards = 3;
		for (int i=1; i<=shards;i++) {
			INotificationHub mock = mock(INotificationHub.class);
			if (shardToReadFirst == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId", "ABCDEF"));
				when(mock.getRegistrationsByChannel("channel", 3, intraHubContinuation)).thenReturn(result);
			}
			if (shardToReadFirst + 1 == i) {
				CollectionResult result = new CollectionResult();
				result.addRegistration(new AppleRegistration("regId2", "ABCDEF2"));
				when(mock.getRegistrationsByChannel("channel", 2, null)).thenReturn(result);
			}
			hubMocks.put(i, mock);
		}
		
		ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration, hubMocks);
		String shardedContinuation = shardToReadFirst + "_Shard_" + intraHubContinuation;
		CollectionResult result = shardedHub.getRegistrationsByChannel("channel", 3, shardedContinuation);
		
		assertNull(result.getContinuationToken());
		assertEquals(2, result.getRegistrations().size());
		Iterator<Registration> it = result.getRegistrations().iterator();
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(2, "regId").toString(), "ABCDEF"), it.next());
		assertEquals(new AppleRegistration(new ShardedNHRegistrationId(3, "regId2").toString(), "ABCDEF2"), it.next());
		
		
		for (int i=1; i<=shards;i++) {
			if (i == shardToReadFirst) {
				verify(hubMocks.get(i)).getRegistrationsByChannel("channel", 3, intraHubContinuation);
			}
			if (i == shardToReadFirst +1 ) {
				verify(hubMocks.get(i)).getRegistrationsByChannel("channel", 2, null);
			}
			if (i > shardToReadFirst + 2) {
				verify(hubMocks.get(i)).getRegistrationsByChannel("channel", 1, null);
			}
		}
	}
}
