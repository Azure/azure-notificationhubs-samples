using Microsoft.ServiceBus.Notifications;
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SafariPushNotifications.Controllers
{
    public class ValuesController : ApiController
    {
        //https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html#//apple_ref/doc/uid/TP40013225-CH3-SW24

        static string connString = "";
        static string hubName = "";

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
}
