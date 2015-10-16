# Get Started with Notification Hubs on Android

This Android Studio 1.4 project is a copy of the completed code for the [Get started with Notification Hubs for Android apps](https://azure.microsoft.com/documentation/articles/notification-hubs-android-get-started/) tutorial.

* You must update your **google cloud messaging settings** on the configure tab of your hub with the GCM API key of your Android app.

* You must also update the following placeholders in *MainActivity.java*:

	- **SENDER_ID**: Set SENDER__ID to the project number that you obtained earlier from the project that you created in the Google Cloud Console.
	- **HubListenConnectionString**: Set HubListenConnectionString to the DefaultListenAccessSignature connection string for your hub. You can copy that connection string by clicking View Connection String on the Dashboard tab of your hub on the Azure portal.
	- **HubFullAccess**: This is only needed if you want to send notifications from the app instead of a backend. Update `HubFullAccess` with the **DefaultFullSharedAccessSignature** connection string for your hub. This connection string can be copied from the [Azure portal] by clicking **View Connection String** on the **Dashboard** tab for your notification hub.
	- **HubName**: Use the name of your notification hub that appears at the top of the page in Azure for your hub (not the full URL). For example, use "myhub".

