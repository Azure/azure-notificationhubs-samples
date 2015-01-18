# Push to WNS sample

This sample is useful when you want to test the end to end flow between client app and WNS without Azure Notification Hubs in the picture. This helps in validating that your client app is set up correctly as well that you have the correct Package SID & Secret that you are configuring in the Azure Notification Hubs. In case the PNS responds with an error then you also get to see the exact error from the WNS itself providing additional information.
 
One of the common Notification errors you will get help in debugging with this application is this - *The Token obtained from the Token Provider is wrong*. This error happens because of either invalid channelURI (because the client app wasn't properly configured) or invalid secret/package SID values. 

This is based on the [Quickstart - send WNS push notification].

###Steps:###

1. Provide the values for `secret` & Package SID (as `sid`) that you get from [Windows Dev Center] for your application. These are the values which are also configured in Azure Notification Hubs. 

2. Provide the values for the `xml` (payload), `notificationType` & `contentType`. You can find more information on this here - [WNS Notification Types]. Example for sending a toast notification you use the following:

	    string xml = @"<toast><visual><binding template=""ToastText01""><text id=""1"">Hello there!</text></binding></visual></toast>";
	    string notificationType = "wns/toast";
	    string contentType = "text/xml";

3. Provide the `channelUri` you receive on the client app when you registered with WNS. E.g. when you execute the following on the Windows app:
		
		var channelUri = await PushNotificationChannelManager.CreatePushNotificationChannelForApplicationAsync();

4. In case of an error, you will see detailed PNS feedback like the following:

    ![][1]

<!-- Links -->
[Quickstart - send WNS push notification]: http://msdn.microsoft.com/en-us/library/windows/apps/xaml/hh868252.aspx
[Windows Dev Center]: http://go.microsoft.com/fwlink/p/?linkid=266582&clcid=0x409
[WNS Notification Types]: http://msdn.microsoft.com/en-us/library/windows/apps/xaml/hh868245.aspx#pncodes_x_wns_type

<!-- Images -->
[1]: ./media/Error.png