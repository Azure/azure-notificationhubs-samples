using Microsoft.Azure.NotificationHubs;
using Microsoft.Extensions.Configuration;
using System;

namespace NotificationHub.Sample.API.Notifications
{
    public class Notifications
    {
        public static Notifications Instance = new Notifications();

        public NotificationHubClient Hub { get; set; }

        private Notifications()
        {
            Hub = NotificationHubClient.CreateClientFromConnectionString("Endpoint=sb://notification-demo-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=swbdaupN+q88e1+rq7LgRtrinwkmql/iYRmvaa8SrFw=", "notification-hub-01");
        }
    }
}