package com.windowsazure.messaging.nhsharding;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;

/**
 * @author Elio Damaggio
 * 
 *         Expected format:
 *         
 *         shard_1_connectionstring: ...
 *         shard_1_hubName: ...
 *         shard_2_connectionstring: ...
 *         shard_2_hubName: ...
 *         ...
 *         shardsWithFreeSpace: 2,3,4
 * 
 */
public class NHConfigurationFromProperties implements INHConfiguration {
	private Map<Integer, String> hubNames = new TreeMap<Integer, String>();
	private Map<Integer, String> hubConnectionStrings = new TreeMap<Integer, String>();
	private List<Integer> availableHubs = new ArrayList<Integer>();

	public NHConfigurationFromProperties(String propertiesPath)
			throws IOException {
		Properties props = new Properties();
		//System.out.println(this.getClass().getResource("").getPath());
		props.load(this.getClass().getResourceAsStream(propertiesPath));


		for (String key : props.stringPropertyNames()) {
			if (key.startsWith("shard_")) {
				String[] split = key.split("_");
				if (split.length != 3)
					throw new IllegalArgumentException(
							"properties have to have the format shard_{shardNumber}_connectionstring or shard_{shardNumber}_hubName");

				if ("connectionString".equalsIgnoreCase(split[2])) {
					int shard = Integer.parseInt(split[1]);
					String cs = props.getProperty(key);
					hubConnectionStrings.put(shard,cs);
				}

				if ("hubName".equalsIgnoreCase(split[2])) {
					hubNames.put(Integer.parseInt(split[1]),
							props.getProperty(key));
				}
			}
			
			if ("shardsWithFreeSpace".equalsIgnoreCase(key)) {
				String[] split = props.getProperty(key).split(",");
				for (String shard : split) {
					availableHubs.add(new Integer(shard.trim()));
				}

			}
		}
	}

	@Override
	public Map<Integer, String> getHubNames() {
		return hubNames;
	}

	@Override
	public Map<Integer, String> getHubConnectionStrings() {
		return hubConnectionStrings;
	}

	@Override
	public List<Integer> getHubsWithFreeSpace() {
		return availableHubs;
	}

}
