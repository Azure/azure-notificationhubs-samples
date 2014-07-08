Notification Hubs REST wrapper for Java 
==========================

Java Back-end SDK for [Azure Notification Hubs]. Using [REST APIs].

Implements most of the Notification Hubs REST operations to perform registration management and send notification.

Please send feedback/comments, and pull requests... :)

# New

* Support for transparent sharding across multiple hubs (for apps with > 5M devices)
* Support for Kindle Fire
* Support for CreateRegistrationId and Upsert (reccommended pattern to create registrations)

#Use

##Compile and build
Use [Maven].

To build:

	mvn package

##Code

Create a client

	hub = new NotificationHub("connection string", "hubname");	

### Create/Update/Delete Registrations

Create Windows registration:

	WindowsRegistration reg = new WindowsRegistration(new URI(CHANNELURI));
	reg.getTags().add("myTag");
	reg.getTags().add("myOtherTag");	
	hub.createRegistration(reg);

Create iOS registration:

	AppleRegistration reg = new AppleRegistration(DEVICETOKEN);
	reg.getTags().add("myTag");
	reg.getTags().add("myOtherTag");
	hub.createRegistration(reg);

Analogous for Android (GCM), Windows Phone (MPNS), and Kindle Fire (ADM).

Create template registrations:

	WindowsTemplateRegistration reg = new WindowsTemplateRegistration(new URI(CHANNELURI), WNSBODYTEMPLATE);
	reg.getHeaders().put("X-WNS-Type", "wns/toast");
	hub.createRegistration(reg);

Create registrations using create registrationid+upsert pattern (removes duplicates deriving from lost responses if registration ids are stored on the device):

	String id = hub.createRegistrationId();
	WindowsRegistration reg = new WindowsRegistration(id, new URI(CHANNELURI));
	hub.upsertRegistration(reg);

Update registrations:

	hub.updateRegistration(reg);

Delete registrations:

	hub.deleteRegistration(regid);

### Query registrations

Get single registration:

	hub.getRegistration(regid);

All collection queries support $top and continuation tokens.

Get all registrations in hub:
	
	hub.getRegistrations();


Get registrations with tag:

	hub.getRegistrationsByTag("myTag");


Get registrations by channel:

	hub.getRegistrationsByChannel("devicetoken");


### Send Notifications

The Notification object is simply a body with headers, some utility methods help in building the native and template notifications objects.

Send Windows native:
	
	Notification n = Notification.createWindowsNotification("WNS body");
	
	// broadcast
	hub.sendNotification(n);
		
	// send to tags	
	Set<String> tags = new HashSet<String>();
	tags.add("boo");
	tags.add("foo");
	hub.sendNotification(n, tags);

	// send to tag expression		
	hub.sendNotification(n, "foo && ! bar");

Send iOS native:
	
	Notification n = Notification.createAppleNotifiation("APNS body");
	hub.sendNotification(n);


Analogous for Android, Windows Phone, and Kindle Fire.

Send template notification:

	Map<String, String> prop =  new HashMap<String, String>();
	prop.put("prop1", "v1");
	prop.put("prop2", "v2");
	Notification n = Notification.createTemplateNotification(prop);
		
	hub.sendNotification(n);

## Sharded Client
If your app has more than 5M devices it is usually better to partition the devices across multiple hubs for performance and reliability.

The class ShardedNotificationHubClient implements INotificationHub (and thus looks and feels like a standard NotificationHub class) but under the hood it shards the registrations across multiple hubs.

It is instantiated with an instance of INHConfiguration which provides the information of the hubs to be used. An implementation of this interface is provided and parses a properties file with this format:

	shard_1_connectionstring: {first connection string}
	shard_1_hubName: {first hub name}

	shard_n_connectionstring: {n-th connection string}
	shard_n_hubName: {n-th hub name}
	
	shardsWithFreeSpace: 2,3

The sharded client creates new registrations by randomly selecting shards specified in the *shardsWithFreeSpace* property. This allows to add new shards when the first hubs are full.
The sharded client then encodes the shard number in the registrationId in a transparent way.

> IMPORTANT: Never change the order of the shards, as all the registration ids and continuationTokens (for queries) will be broken.

Example:
	
	INHConfiguration configuration = new NHConfigurationFromProperties("/shardConfigurationTest.properties");
	ShardedNotificationHubClient shardedHub = new ShardedNotificationHubClient(configuration);
	shardedHub.upsertRegistration(reg);

## References:

[MSDN documentation]

[Windows Azure Notification Hubs Service Page]

Nice tutorials that are easy to translate in Java:

* [Get Started with Notification Hubs]
* [Send breaking news]
* [Send localized breaking news]
* [Send notifications to authenticated users]
* [Send cross-platform notifications to authenticated users]

#Dependencies

This project uses HttpClient and a bunch of ApacheCommons libraries.

#Status
**Complete**:

* Full implementation of Registration Mgmt and Sends
* Full E2E coverage (bring your own hub...)
* Javadocs

**To add**:

* Missing unit tests for NotificationHub class.

**Caveats**:

* Not tested for performance. You can plug in your own HttpClient instance if you want to improve connection pooling, adding retry policies and such.
* Not Microsoft official Notification Hubs Java SDK.


[REST APIs]: http://msdn.microsoft.com/en-us/library/windowsazure/dn223264.aspx
[Maven]: http://maven.apache.org/

[Windows Azure Notification Hubs]: http://www.windowsazure.com/en-us/documentation/services/notification-hubs/
[MSDN documentation]: http://msdn.microsoft.com/en-us/library/windowsazure/jj891130.aspx
[Windows Azure Notification Hubs Service Page]: http://www.windowsazure.com/en-us/documentation/services/notification-hubs/
[Get Started with Notification Hubs]: http://www.windowsazure.com/en-us/manage/services/notification-hubs/getting-started-windows-dotnet/
[Send breaking news]: http://www.windowsazure.com/en-us/manage/services/notification-hubs/breaking-news-dotnet/
[Send localized breaking news]: http://www.windowsazure.com/en-us/manage/services/notification-hubs/breaking-news-localized-dotnet/
[Send notifications to authenticated users]: http://www.windowsazure.com/en-us/manage/services/notification-hubs/notify-users/
[Send cross-platform notifications to authenticated users]: http://www.windowsazure.com/en-us/manage/services/notification-hubs/notify-users-xplat-mobile-services/


