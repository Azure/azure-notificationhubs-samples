using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace SafariPushNotifications
{
    public static class WebApiConfig
    {
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
    }
}
