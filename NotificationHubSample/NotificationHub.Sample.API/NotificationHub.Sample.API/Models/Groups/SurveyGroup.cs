using NotificationHub.Sample.API.Models.Authentication;
using NotificationHub.Sample.API.Models.Notifications;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationHub.Sample.API.Models.Groups
{
    public class SurveyGroup
    {
        public SurveyGroup()
        {
            ApplicationUsers = new HashSet<ApplicationUser>();
            NotificationMessages = new HashSet<NotificationMessage>();
            ApplicationUserIds = new List<string>();
        }

        public int Id { get; set; }
        public string GroupName { get; set; }
        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }
        public virtual ICollection<NotificationMessage> NotificationMessages { get; set; }

        [NotMapped]
        public List<string> ApplicationUserIds { get; set; }
    }
}
