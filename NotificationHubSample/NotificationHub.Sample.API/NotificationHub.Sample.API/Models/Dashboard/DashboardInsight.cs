using System.Collections.Generic;

namespace NotificationHub.Sample.API.Models.Dashboard
{
    public class DashboardInsight
    {
        public int TotalNotificationsSent { get; set; }
        public int TotalGroups { get; set; }
        public int TotalUsers { get; set; }

        public List<NotificationTrend> NotificationTrends { get; set; }
        public List<DeviceTrend> DeviceTrends { get; set; }
    }
}
