using Microsoft.Azure.NotificationHubs;

namespace NotificationHub.Sample.API.Notifications
{
    public class Notifications
    {
        public static Notifications Instance = new Notifications();

        public NotificationHubClient Hub { get; set; }

        private Notifications()
        {
            Hub = NotificationHubClient.CreateClientFromConnectionString(Startup.AzureNotificationHubConnectionString,Startup.AzureNotificationHubNameSpace);
        }
    }
}
