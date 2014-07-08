package com.windowsazure.messaging.nhsharding;

public class ShardedNHRegistrationId {
	private static final String NFL_ID_SEPARATOR = "_ShardedHub_";
	
	private int shard;
	private String registrationId;
	
	public ShardedNHRegistrationId(int shard, String registrationId) {
		super();
		this.shard = shard;
		this.registrationId = registrationId;
	}
	
	public ShardedNHRegistrationId(String shardedRegistrationId) {
		String[] split = shardedRegistrationId.split(NFL_ID_SEPARATOR);
		
		if (split.length != 2)
			throw new IllegalArgumentException("Failed to parse sharded registrationId");
		
		shard = Integer.parseInt(split[0]);
		registrationId = split[1];
	}

	public int getShard() {
		return shard;
	}

	public String getRegistrationId() {
		return registrationId;
	}
	
	

	@Override
	public String toString() {
		return shard + NFL_ID_SEPARATOR + registrationId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((registrationId == null) ? 0 : registrationId.hashCode());
		result = prime * result + shard;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ShardedNHRegistrationId other = (ShardedNHRegistrationId) obj;
		if (registrationId == null) {
			if (other.registrationId != null)
				return false;
		} else if (!registrationId.equals(other.registrationId))
			return false;
		if (shard != other.shard)
			return false;
		return true;
	}
	
	
}
