package com.windowsazure.messaging;

import java.util.Set;


/**
 * Interface for the REST wrapper of WIndows Azure Notification Hubs
 */
public interface INotificationHub {
	
	/**
	 * Create a registrationId, without creating an actual registration. To create use upsert.
	 * This method is used when the registration id is stored only on the device.
	 *  
	 * @return a registration id.
	 */
	String createRegistrationId();
	
	/**
	 * This method creates a new registration
	 * @param registration A registration object containing the description of the registration to create.
	 * ETag and registrationid are ignored
	 * 
	 * @return the created registration containing the read-only parameters (registrationid, etag, and expiration time).
	 */
	Registration createRegistration(Registration registration);
	
	/**
	 * This methods updates an existing registration
	 * 
	 * @param registration A registration object containing the description of the registration to update.
	 * The registration id has to be populated.
	 * 
	 * @throws Runtime exception if the registration already exists
	 * 
	 * @return the updated registration containing the read-only parameters (registrationid, etag, and expiration time).
	 */
	Registration updateRegistration(Registration registration);
	
	/**
	 * This method updates or creates a new regiostration with the registration id specified.
	 * 
	 * @param registration A registration object containing the description of the registration to create or update.
	 * The registration id has to be populated.
	 * 
	 * @return the updated registration containing the read-only parameters (registrationid, etag, and expiration time).
	 */
	Registration upsertRegistration(Registration registration);
	
	/**
	 * Deletes a registration.
	 * 
	 * @param registration. Registration id has to be populated.
	 */
	void deleteRegistration(Registration registration);
	
	/**
	 * Deletes a registration.
	 * 
	 * @param registrationId
	 */
	void deleteRegistration(String registrationId);
	
	/**
	 * Retrieves the description of a registration based on the id.
	 * 
	 * @param registrationId
	 * @return A registration object
	 */
	Registration getRegistration(String registrationId);
	
	/**
	 * Return all registrations in this hub
	 * 
	 * @return Registration collection.
	 */
	CollectionResult getRegistrations();
	
	/**
	 * Returns all registrations in this hub
	 * 
	 * @param top The maximum number of registrations to return (max 100)
	 * @param continuationToken If not-null, continues iterating through a previously requested query.
	 * 
	 * @return Registration collection.
	 */
	CollectionResult getRegistrations(int top, String continuationToken);
	
	/**
	 * Returns all registrations with a specific tag
	 * 
	 * @param tag
	 * 
	 * @return Registration Collection
	 */
	CollectionResult getRegistrationsByTag(String tag);
	
	/**
	 * Returns all registrations with a specific tag
	 * 
	 * @param tag
	 * @param top The maximum number of registrations to return (max 100)
	 * @param continuationToken If not-null, continues iterating through a previously requested query.
	 * 
	 * @return Registration Collection
	 */
	CollectionResult getRegistrationsByTag(String tag, int top, String continuationToken);
	
	/**
	 * Returns all registration with a specific channel (e.g. ChannelURI, device token)
	 * @param channel
	 * @return Registration Collection
	 */
	CollectionResult getRegistrationsByChannel(String channel);
	
	/**
	 * Returns all registration with a specific channel (e.g. ChannelURI, device token)
	 * @param channel
	 * @param top The maximum number of registrations to return (max 100)
	 * @param continuationToken If not-null, continues iterating through a previously requested query.
	 * @return Registration Collection
	 */
	CollectionResult getRegistrationsByChannel(String channel, int top, String continuationToken);
	
	/**
	 * Sends a notification to all eligible registrations (i.e. only correct platform, if notification is platform specific)
	 * 
	 * @param notification
	 */
	void sendNotification(Notification notification);
	
	/**
	 * Sends a notifications to all eligible registrations with at least one of the specified tags
	 * 
	 * @param notification
	 * @param tags
	 */
	void sendNotification(Notification notification, Set<String> tags);
	
	/**
	 * Sends a notifications to all eligible registrations that satisfy the provided tag expression
	 * 
	 * @param notification
	 * @param tagExpression
	 */
	void sendNotification(Notification notification, String tagExpression);
	
}
