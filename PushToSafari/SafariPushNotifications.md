# Safari Push Notifications using Azure Notification Hubs and Azure WebSites

This sample does a walkthrough of how you can implement Safari Push Notifications using [Azure Notification Hubs].
Apple supports Safari Push Notifications which are widely popular and have been implemented on many notable sites like NYTimes.com. Once a user has consented to receive notifications, push notifications can be delivered to the user even if the user does not have the web site or even Safari open. As always, you need to be cautious about the delivery cadence so that the user doesn't feel spammed. The user can always go to the Safari Preferences and disable the notifications for a site. 

![1]

[Apple - Safari Push guidance] provides a detailed guidance on the implementation. Here is the general flow:

1. The WebServer serves the web site content to the user. 
2. The client running in the Safari Web browser prompts the user to receive notifications. 
3. When the user consents then the Safari client makes a request to a web service which delivers the requisite 'package' to the client. This package contains details about the site in an Apple specified secured package format. 
4. Safari client then fetches a secure device token (APNS identifier) which identifies the client instance to receive notifications. 
5. Safari client sends this token to the web service URL which must persistently store it. 
6. A push agent uses this token to send a notification to the client instance using APNS. 
7. If User disables the push notifications for this web site then a call is made to the web service so that it can delete the device token registration. 

In the sample we are using **Azure Web Sites** to implement the webserver and the web service APIs and **Azure Notification Hubs** to register the client and send notifications. 

## Generate the certificate signing request
Follow the steps in the *Generate the certificate signing request* section of the [Azure Notification Hubs - iOS tutorial] to generate a certificate signing request. Certificate Signing Request (CSR) file is used by Apple to generate a signed certificate.

## Generate the certificate

1. Login to Apple iOS Developer portal and navigate to **'Certificates, Identifiers & Profiles'**

	![8]

2. Registration requires an *iOS Apps developer license* or *Mac Apps developer license*. 

3. Click Certificates and click + sign to add a new certificate.

	![11]

4. Select *Website Push ID Certificate* in the selection. 

	![14]

5. Select or create a new *WebSite Push ID*

	![9]

6. You will have to provide the following information:

	- *Identifier (Website Push ID)*: Your unique reverse-domain string, such as web.com.example.domain (the string must start with web.)
	- *Website Push ID Description*: This is the name used throughout the Provisioning Portal to refer to your website. Use it to label your Website Push IDs into a more human-readable format.

	![10]

7. Select the WebSite Push ID (you may have to navigate to this screen again to select. 

	![13]

8. Next, you will be asked to upload the *Certificate Signing Request (CSR)* file you generated in the previous step. Once you do this you will be able to download the certificate. 

9. Double click the saved certificate (which is in .CER format) to install it in the login keychain. 
	
10. In Keychain Access, right-click this new certificate -> click Export -> name the file -> select the .p12 format and click Save.

## Configure Azure Notification Hubs

Follow the steps in the *Configure your notification hub* section of the [Azure Notification Hubs - iOS tutorial] to provision and configure a Notification Hub with this certificate. Make note of the *DefaultFullSharedAccessSignature* which you will use to communicate with the notification hub. 

## Setting up the web site & service

1. Login to the Azure Management Portal and create an Azure Web Site. E.g. for the tutorial I created 'http://piyushjosafaripush.azurewebsites.net'. 

2. Follow the *Building the Push Package* section in the [Apple - Safari Push guidance].  

3. Here is a sample website.json which goes in the package:

		{
		    "websiteName": "Azure Notification Hubs Push Demo",
		    "websitePushID": "web.com.example.azurenhpush",
		    "allowedDomains": ["http://piyushjosafaripush.azurewebsites.net", "https://piyushjosafaripush.azurewebsites.net"],
		    "urlFormatString": "http://piyushjosafaripush.azurewebsites.net/%@",
		    "authenticationToken": "19f8d7a6e9fb8a7f6d9330dabe",
		    "webServiceURL": "https://piyushjosafaripush.azurewebsites.net"
		}

	View *Table 2-1  Allowed keys in the website.json file* in [Apple - Safari Push guidance] for a description of these fields.
 
	- websitePushID must match what you provided earlier during Apple provisioning. 
	- I am using the Azure Web Sites provisioned site for all the URLs. Note that the webServiceURL must be using HTTPS. 
	- I am not using the authenticationToken later to identify any user so just putting a dummy value there. 
	- urlFormatString is the URL where the user will go when they click on the notification. '%@' is a placeholder whose values you pass when sending the notification. 

4. Next you need to create a pushPacakge.zip. I used the 'createPushPackage.php' file from the [Apple - Safari Push guidance] to create this. You can create one and use it for all the requests as a static file if you are not using the authenticationToken to differentiate the user. Otherwise you will have to create one dynamically for all requests using 'createPushPackage.php'. 

	- If you want to run the PHP script, it will require you to install PHP and OpenSSL. 
	- While setting up the PHP environment, you will need to uncomment the 'openssl extension' & 'extension_dir' in PHP.ini. 
	- You may need both the .pem file and the .p12 certificate files to run the script to create the zip file. 

5. Open Visual Studio and create a Web API project. 

6. Create a Notifications folder in the solution and add the pushPackage.zip file in it and add it to the project. 

7. Add the 'WindowsAzure.ServiceBus.2.6.1' package which will allow you to communicate with the Notification Hubs. 

8. Create a 'ValuesController' with the following APIs which are called by the Safari client while generating the pushToken. 

		public class ValuesController : ApiController
	    {
	        //https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html
	
	        static string connString = "<Enter the Connection String>";
	        static string hubName = "<Enter the Notification Hub Name";
	
	        NotificationHubClient hub = NotificationHubClient
	            .CreateClientFromConnectionString(connString, hubName);
	
	        [HttpPost]
	        public HttpResponseMessage ReturnWebsitePackage()
	        {
	            Trace.TraceInformation("Returning website package");
	            var root = HttpRuntime.AppDomainAppPath;
	            var path = root + @"/Notifications/pushPackage.zip";
	            var result = new HttpResponseMessage(HttpStatusCode.OK);
	
	            var stream = new FileStream(path, FileMode.Open);
	            result.Content = new StreamContent(stream);
	            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/zip");
	            result.Content.Headers.ContentDisposition
	                = new ContentDispositionHeaderValue("attachment")
	                {
	                    FileName = "pushPackage.zip"
	                };
	
	            return result;
	        }
	
	        [HttpPost]
	        public async Task<AppleRegistrationDescription> ProcessRegistration(string deviceToken)
	        {
	            Trace.TraceInformation("Creating Registration");
	            AppleRegistrationDescription registration = await hub.CreateAppleNativeRegistrationAsync(deviceToken);
	            Trace.TraceInformation("Created Registration with id '{0}'", registration.RegistrationId);
	            return registration;
	        }
	
	        [HttpDelete]
	        public async Task<bool> DeleteRegistration(string deviceToken)
	        {
	            Trace.TraceInformation("Deleting Registration");
	            await hub.DeleteRegistrationsByChannelAsync(deviceToken);
	            return true;
	        }   
	        
	        [HttpPost]
	        public async void LogErrors()
	        {
	            // Write out the body (which contains errors in JSON)
	            Trace.TraceError(await Request.Content.ReadAsStringAsync());
	        }
	    }  

9. Open up the WebAPIConfig file and update it as the following to route all incoming requests to the correct APIs. This follows the pattern of the APIs called by the Safari client and we don't have to write any client side code to call these APIs. 

        public static void Register(HttpConfiguration config)
        {
            string websitePushId = "web.com.example.azurenhpush";

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute
                (
                name: "ReturnPushPackageRule",
                routeTemplate: "v1/pushPackages/" + websitePushId,
                defaults: new
                    {
                        controller = "Values",
                        action = "ReturnWebsitePackage"
                    }
                );

            config.Routes.MapHttpRoute
                (
                name: "CreateRegistration",
                routeTemplate: "v1/devices/{deviceToken}/registrations/" + websitePushId,
                defaults: new
                {
                    controller = "Values",
                }
            );

            config.Routes.MapHttpRoute
                (
                name: "DeleteRegistration",
                routeTemplate: "v1/devices/{deviceToken}/registrations/" + websitePushId,
                defaults: new
                {
                    controller = "Values",
                }
            );

            config.Routes.MapHttpRoute
                (
                name: "LogErrorsRule",
                routeTemplate: "v1/log",
                defaults: new 
                    { 
                        controller = "Values", 
                        action = "LogErrors" 
                    }
                );
        }

10. Note that the incoming URL contains the webSitePushId which contains the '.' character and therefore I had to update the Web.config file to add the following:

		  <system.webServer>
		     <modules runAllManagedModulesForAllRequests="true" />
		  </system.webServer>

11. Add an *Updates.html* to the project at the root. This will be the page which will be called when the user clicks the notification. 

12. Open up the Layout.cshtml and update it to the following:
		
		<!DOCTYPE html>
		<html>
		<head>
		    <meta charset="utf-8" />
		    <meta name="viewport" content="width=device-width" />
		    <title>@ViewBag.Title</title>
		    @Styles.Render("~/Content/css")
		    @Scripts.Render("~/bundles/modernizr")
		</head>
		<body>
		    <div class="container body-content">
		        @RenderBody()
		        <br />
		        <footer>
		            <p><h3>Powered by Azure Notification Hubs and Azure Web Sites</h3></p>
		        </footer>
		    </div>
		    @Scripts.Render("~/bundles/jquery")
		    @Scripts.Render("~/bundles/bootstrap")
		    @RenderSection("scripts", required: false)
		</body>
		</html>

13. Open up the Index.cshtml and update it to the following: 

		<div class="jumbotron">
		    <p class="lead">Apple Safari Notifications</p>
		    <p><a id="registerPush" class="btn btn-primary btn-lg">Click here to register</a></p>
		    <script>
		        var pushId = "web.com.example.azurenhpush";
		        var websiteURL = "https://piyushjosafaripush.azurewebsites.net";
		
		        var subscribe = document.querySelector("#registerPush");
		            subscribe.addEventListener("click", function(evt) {
		            pushNotification();
		            }, false);
		
		        var pushNotification = function () {
		        "use strict";
		            // Ensure that the user can receive Safari Push Notifications.
		            if ('safari' in window && 'pushNotification' in window.safari) {
		                var permissionData = window.safari.pushNotification.permission('web.com.example.azurenhpush');
		                checkRemotePermission(permissionData);
		            } else {
		                alert("Push notifications not supported.");
		            }
		        };
		
		        var checkRemotePermission = function (permissionData) {
		            if (permissionData.permission === 'default') {
		                // This is a new web service URL and its validity is unknown.
		                window.safari.pushNotification.requestPermission(
		                websiteURL, // The web service URL.
		                pushId,     // The Website Push ID.
		                {}, // Data that you choose to send to your server to help you identify the user.
		                checkRemotePermission         // The callback function.
		                );
		            }
		            else if (permissionData.permission === 'denied') {
		                // The user said no.
		            }
		            else if (permissionData.permission === 'granted') {
		                // The web service URL is a valid push provider, and the user said yes.
		                // permissionData.deviceToken is now available to use.
		                alert(permissionData.deviceToken);
		            }
		        };
		    </script>
		</div>

	The client calls the respective APIs on the web service URL (which must be using HTTPS) when running in Safari browser to:
	- download the .zip package you uploaded 
	- fetch the deviceToken when the user approves the request to show notifications. 

14. Publish the web site to Azure. 

## Requesting permission & receiving notifications

1. Navigate to the web site from an Apple Safari browser and you will see the following:

	![2]

2. Click on the 'Click here to register' button which will prompt the browser to ask for permissions to send you push notifications. 

	![3]

3. When you click 'Allow' then a request is made to the .zip package which is downloaded and verified and once everything looks good, Safari specifies the DeviceToken. This is the call to the 'ReturnWebsitePackage' on your web service. 

	![4]

4. If there are any issues then you will see a call made to the 'LogErrors' operation. 

5. This device token needs to be added to the Notification Hubs as a registration which the call to 'ProcessRegistration' does. 

6. Once a registration has been created in the Notification Hub, you can use any client to send a push notification. I typically use Visual Studio - Server explorer. This allows you to view the added registration as well as send test notification. 

8. You will use the following notification payload to send the notification. 

		{
			"aps":
				{
					"alert":
					{
						"title":"Notification",
						"body":"Hello from Azure!"
					},
					"url-args":["Updates.html"]
				}
		}

	- Note that this payload is in a different format then what is supported by the Apple iOS notification. 
	- url-args is a must have parameter and you cannot skip it even if empty. This populates the placeholder '%@' in the urlFormatString. So in this sample when the user clicks the notification they will be navigated to "http://piyushjosafaripush.azurewebsites.net/Updates.html"

9. When you send the notification, it will show up on the Notification window even if Safari or the website is closed. 

	![1]

10. When you click on the notification, you will be navigated to 'http://piyushjosafaripush.azurewebsites.net/Updates.html'

	![5]

11. When a user goes to deny the notifications to a website then a call is made to the 'DeleteRegistration' to clean up the registration. 

	![6]

12. If you enable streaming logs for your Azure Web Site at verbose level and enable all logs then you will also see the logging information as follows:

	![7]

<!-- URLs -->
[Apple - Safari Push guidance]: https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html
[SafariPush - Node server sample]: http://samuli.hakoniemi.net/how-to-implement-safari-push-notifications-on-your-website/
[SafariPush - PHP server sample]: https://github.com/pepalo/Safari-Push-Notifications-Heroku
[Azure Notification Hubs]: http://azure.microsoft.com/en-us/documentation/services/notification-hubs/
[Azure Notification Hubs - iOS tutorial]: http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-ios-get-started

<!-- Images -->
[1]: Images/SafariNotification.png
[2]: Images/Website.png
[3]: Images/PermissionRequest.png
[4]: Images/DeviceToken.png
[5]: Images/NotificationClick.png
[6]: Images/DenyPermission.png
[7]: Images/StreamingLogs.png
[8]: Images/Cert_ApplePortal.png
[9]: Images/Cert_CreatePushID1.png
[10]: Images/Cert_CreatePushID2.png
[11]: Images/Cert_NewCert.png
[12]: Images/Cert_SelectCSR.png
[13]: Images/Cert_SelectPushID.png
[14]: Images/Cert_WebSitePushCert.png