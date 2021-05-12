using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Models.Dashboard
{
    public class NotificationTrend
    {
        public string Timestamp { get; set; }
        public int NotificationsSent { get; set; }
    }
}
