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
            Hub = NotificationHubClient.CreateClientFromConnectionString("<Enter your connection string with full access", "your hub name");
        }
    }
}
