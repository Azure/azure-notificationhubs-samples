package com.windowsazure.messaging.nhsharding;

import java.util.List;
import java.util.Map;

/**
 * @author Elio Damaggio
 * 
 * IMPORTANT: To Maintain integrity of ids and continuationTokens shards should not change index and order in the configuration.
 * E.g. once a particular hub is at position 1, it should never become 2.
 *
 */
public interface INHConfiguration {

	Map<Integer, String> getHubNames();

	Map<Integer, String> getHubConnectionStrings();
	
	/**
	 * @return a list of shard positions where new registrations can be created
	 */
	List<Integer> getHubsWithFreeSpace();

}
