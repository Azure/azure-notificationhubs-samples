using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Azure.NotificationHubs;

namespace AppBackend.Models
{
    public class Notifications
    {
        public static Notifications Instance = new Notifications();

        public NotificationHubClient Hub { get; set; }

        private Notifications()
        {
//            Hub = NotificationHubClient.CreateClientFromConnectionString("<Enter your connection string with full access", "your hub name");
            Hub = NotificationHubClient.CreateClientFromConnectionString("Endpoint=sb://wesmc-hub-ns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=Ztd5lKYAovSs+g3gs0M/EkbVRuIVw7ft4BUylZRtcss=", "wesmc-hub");
        }
    }
}
