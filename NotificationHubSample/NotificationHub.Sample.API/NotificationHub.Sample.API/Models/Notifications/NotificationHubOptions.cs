using System.ComponentModel.DataAnnotations;

namespace NotificationHub.Sample.API.Models.Notifications
{
    public class NotificationHubOptions
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string ConnectionString { get; set; }
    }
}
