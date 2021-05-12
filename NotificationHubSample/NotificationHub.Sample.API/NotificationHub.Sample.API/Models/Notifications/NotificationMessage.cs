using NotificationHub.Sample.API.Models.Authentication;
using NotificationHub.Sample.API.Models.Groups;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Models.Notifications
{
    public class NotificationMessage
    {
        public NotificationMessage()
        {
            Users = new HashSet<ApplicationUser>();
            SurveyGroups = new HashSet<SurveyGroup>();
        }

        public int Id { get; set; }
        public string Type { get; set; }
        public string NotificationTitle { get; set; }
        public string NotificationDescription { get; set; }
        public DateTime SentTime { get; set; }
        public virtual ICollection<ApplicationUser> Users { get; set; }
        public virtual ICollection<SurveyGroup> SurveyGroups { get; set; }

        [NotMapped]
        public List<string> UserTags { get; set; }
        [NotMapped]
        public List<int> SurveyGroupTags { get; set; }
    }
}
