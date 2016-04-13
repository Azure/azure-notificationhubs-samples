# Get Started with Notification Hubs on Android

This Android Studio 2.0 project is a copy of the completed code for the [Sending push notifications to Android with Azure Notification Hubs](https://azure.microsoft.com/documentation/articles/notification-hubs-android-get-started/) tutorial.

* You must update your **Google (GCM)** access policy on the setting blade of your notification hub with the GCM API key you created for your Android app.

* You must also update the following placeholders in [NotificationSettings.java](./app/src/main/java/com/example/microsoft/getstarted/NotificationSettings.java):

	- **SenderId**: Set to the project number that you obtained earlier from the project that you created in the Google Cloud Console.
	- **HubName**: Use the name of your notification hub that appears at the top of the page in Azure for your hub (not the full URL). For example, use "myhub".
	- **HubListenConnectionString**: Set to the DefaultListenAccessSignature connection string for your hub. You can copy that connection string by clicking keys button on the main page for your hub on the Azure portal.
	- **HubFullAccess**: This is only needed if you want to send notifications from the app instead of a backend. Update `HubFullAccess` with the **DefaultFullSharedAccessSignature** connection string for your hub. This connection string can be copied by clicking keys button on the main page for your hub on the Azure portal.
