package com.windowsazure.messaging;

import java.util.LinkedList;
import java.util.List;

/**
 * Class representing the result of a query returning a set of registrations.
 * 
 */
public class CollectionResult {
	private String continuationToken;
	private List<Registration> registrations = new LinkedList<Registration>();

	public CollectionResult() {
		// TODO Auto-generated constructor stub
	}

	public void addRegistration(Registration registration) {
		registrations.add(registration);
	}

	public List<Registration> getRegistrations() {
		return registrations;
	}

	/**
	 * Gets the continuation token for this result. If the continuation is null,
	 * then there are no more registration in this result set.
	 * 
	 * @return continuation token
	 */
	public String getContinuationToken() {
		return continuationToken;
	}

	public void setContinuationToken(String continuationToken) {
		this.continuationToken = continuationToken;
	}
}
