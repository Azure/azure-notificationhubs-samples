# Azure Notification Hubs - Push to Windows Phone Silverlight application

Azure Notification Hubs Windows Phone SDK currently does not support using WNS with Windows Phone 8.1 Silverlight apps. This sample takes you through the steps to create a Windows Phone 8.1 Silverlight app which registers with Azure Notification Hubs (ANH) so that it can receive notifications via ANH. 

If you have a Windows Universal application then see this for how to use ANH to do notifications with WNS - [Notification Hubs - Windows Universal tutorial]. 

If you have a Windows Phone application (non- Silverlight) then see this for how to use ANH to do notifications with MPNS - [Notification Hubs - Windows Phone tutorial]. 

Here are couple of links to provide guidance (from Windows Dev Center) - 

- [Windows Phone 8 app developer guidance]
- [MPNS/WNS guidance]

###Steps:###

1. Open up Visual Studio and create a Windows Phone Silverlight application. 

	![][4]

2. Register your app for the Windows Store if not already. You can follow the instructions at [Notification Hubs - Windows Universal tutorial] (see section - *Register your app for the Windows Store*)

3. Make a note of the *Package SID*, *Client Secret* and *Application Identity*. 

4. Create an Azure Notification Hub and configure the Package SID and Client Secret you obtained from the previous step in here. You can follow the instructions at [Notification Hubs - Windows Universal tutorial] on how to do this (see section - *Configure your Notification Hub*)

5. For your Windows Phone Silverlight app - open up the *Package.appxmanifest* and configure *Identity Name="[UPDATE THIS]" Publisher="[UPDATE THIS]"* based on what you obtained from *Application Identity* e.g. 

		<Identity Name="18999Apps.SilverlightPhonePush" Publisher="CN=9EAF99G5-DAD8-4A08-AB62B-1234C6A85678" /> 

6. Open up the package.appxmanifest in Visual Studio and enable Toast notifications. 

	![][2]

7. Also enable **Internet (Client & Server)** capability. 

	![][3]

8. Remove any unneeded declarations from the *Declaration* tab in package.appxmanifest file. 

9. Make sure you are calling the following method at the app startup. Configure your *Notification Hub name* and the *DefaultListenSharedAccessSignature*. 

		public async void RegisterToReceiveNotifications()
	        {
	            string notificationHubName = "[hubName]";
	            string connectionString = "[ConnectionString-DefaultListenSharedAccessSignature]";
	
	            // Register with WNS
	            var channel = await PushNotificationChannelManager.CreatePushNotificationChannelForApplicationAsync();
	            
	            // Register with Azure Notification Hubs
	            NotificationHub hub = new NotificationHub(notificationHubName, connectionString);
	            hub.Register(channel.Uri);
	            Debug.WriteLine("ChannelURI : {0}", channel.Uri);
	        }
	
10. Add a Notification Hub class which abstracts the functionality of registering with the Azure Notification Hubs. This is based on [Notification Hubs REST APIs]. See explanation in the following steps:

		class NotificationHub
	    {
	        private const string ApiVersion = "?api-version=2014-09";
	        private const string AuthHeader = "Authorization";
	        private const string ContentType = "application/atom+xml;type=entry;charset=utf-8";
	
	        static string HubName { get; set; }
	        static string ConnectionString { get; set; }
	        static string Endpoint { get; set; }
	        static string SasKeyName { get; set; }
	        static string SasKeyValue { get; set; }
	        static string Payload { get; set; } 
	
	        public NotificationHub(string hubName, string connectionString)
	        {
	            HubName = hubName;
	            ConnectionString = connectionString;
	        }
	
	        public void Register(string pushChannel) 
	        {
	            ParseConnectionInfo();
	            SendNHRegistrationRequest(pushChannel);
	        }
	
	        // From http://msdn.microsoft.com/en-us/library/dn495627.aspx 
	        private static void ParseConnectionInfo()
	        {
	            if (string.IsNullOrWhiteSpace(HubName))
	            {
	                throw new InvalidOperationException("Hub name is empty");
	            }
	
	            var parts = ConnectionString.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries);
	
	            if (parts.Length != 3)
	            {
	                throw new InvalidOperationException("Error parsing connection string: " + ConnectionString);
	            }
	
	            foreach (var part in parts)
	            {
	                if (part.StartsWith("Endpoint"))
	                {
	                    Endpoint = "https" + part.Substring(11);
	                }
	                else if (part.StartsWith("SharedAccessKeyName"))
	                {
	                    SasKeyName = part.Substring(20);
	                }
	                else if (part.StartsWith("SharedAccessKey"))
	                {
	                    SasKeyValue = part.Substring(16);
	                }
	            }
	        }
	        private static string GenerateSaSToken(Uri uri)
	        {
	            var targetUri = WebUtility.UrlEncode(uri.ToString().ToLower()).ToLower();
	            
	            var expiresOnDate = Convert.ToInt64(DateTime.UtcNow.Subtract
	                (new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds) + 60 * 60;
	            var toSign = targetUri + "\n" + expiresOnDate;
	
	            var keyBytes = Encoding.UTF8.GetBytes(SasKeyValue);
	            var mac = new HMACSHA256(keyBytes);
	            mac.Initialize();
	            var rawHmac = mac.ComputeHash(Encoding.UTF8.GetBytes(toSign));
	            var signature = WebUtility.UrlEncode(Convert.ToBase64String(rawHmac));
	
	            var token = "SharedAccessSignature sr=" + targetUri + "&sig=" 
	                    + signature + "&se=" + expiresOnDate + "&skn=" + SasKeyName;
	            return token;
	        }
	
	        private static void SendNHRegistrationRequest(string pushChannel)
	        {
	            Payload =
	            @"<?xml version=""1.0"" encoding=""utf-8""?>
	            <entry xmlns=""http://www.w3.org/2005/Atom"">
	              <content type=""application/xml"">
	                <WindowsRegistrationDescription xmlns:i=""http://www.w3.org/2001/XMLSchema-instance"" xmlns=""http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"">
	                  <ChannelUri>{WindowsPushChannel}</ChannelUri>
	                </WindowsRegistrationDescription >
	              </content>
	            </entry>";
	
	            Payload = Payload.Replace("{WindowsPushChannel}", pushChannel);
	
	            var uri = new Uri(Endpoint + HubName + "/registrations/" + ApiVersion);
	            var sendRequest = WebRequest.CreateHttp(uri);
	            sendRequest.Method = "POST";
	            sendRequest.ContentType = ContentType;
	            sendRequest.Headers[AuthHeader] = GenerateSaSToken(uri);
	            sendRequest.BeginGetRequestStream(new AsyncCallback(GetRequestStreamCallback), sendRequest);
	        }
	
	        static void GetRequestStreamCallback(IAsyncResult asynchronousResult)
	        {
	            HttpWebRequest request = (HttpWebRequest)asynchronousResult.AsyncState;
	            // End the stream request operation
	            Stream postStream = request.EndGetRequestStream(asynchronousResult);
	
	            byte[] byteArray = Encoding.UTF8.GetBytes(Payload);
	
	            postStream.Write(byteArray, 0, byteArray.Length);
	            postStream.Close();
	
	            //Start the web request
	            request.BeginGetResponse(new AsyncCallback(GetResponceStreamCallback), request);
	        }
	
	        static void GetResponceStreamCallback(IAsyncResult callbackResult)
	        {
	            HttpWebRequest request = (HttpWebRequest)callbackResult.AsyncState;
	            HttpWebResponse response = (HttpWebResponse)request.EndGetResponse(callbackResult);
	            using (StreamReader httpWebStreamReader = new StreamReader(response.GetResponseStream()))
	            {
	                string result = httpWebStreamReader.ReadToEnd();
	                //For debug: show results
	                Debug.WriteLine(result);
	            }
	        }
	    }

11. `ParseConnectionInfo` & `GenerateSaSToken` are used to create the standard Authorization header you need to communicate with Azure Notification Hubs. 

12. `SendNHRegistrationRequest` crafts the HTTP request to register with the Azure Notification Hubs by using HttpWebRequest. 

13. Now you can send a test notification to test this. I used Visual Studio to test this but you can use Portal or a simple console application to do the same. 

	![][1]

<!-- Links -->
[Windows Dev Center]: http://go.microsoft.com/fwlink/p/?linkid=266582&clcid=0x409
[Notification Hubs - Windows Universal tutorial]: http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-windows-store-dotnet-get-started/
[Notification Hubs - Windows Phone tutorial]: http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-windows-phone-get-started/
[MPNS/WNS guidance]: http://msdn.microsoft.com/en-us/library/windows/apps/dn642085(v=vs.105).aspx
[Windows Phone 8 app developer guidance]: http://msdn.microsoft.com/en-us/library/windows/apps/dn655121(v=vs.105).aspx
[Notification Hubs REST APIs]: http://msdn.microsoft.com/en-us/library/azure/dn223264.aspx

<!-- Images -->
[1]: ./media/SuccessfulPush.png
[2]: ./media/EnableToast.png
[3]: ./media/EnableInternetCapability.png
[4]: ./media/CreateSLPhoneApp.png
