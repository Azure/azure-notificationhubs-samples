using Microsoft.AspNetCore.Identity;
using NotificationHub.Sample.API.Models.Groups;
using NotificationHub.Sample.API.Models.Notifications;
using System.Collections.Generic;


namespace NotificationHub.Sample.API.Models.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            SurveyGroups = new HashSet<SurveyGroup>();
            NotificationMessages = new HashSet<NotificationMessage>();
        }

        public string RegistrationId { get; set; }

        public virtual ICollection<SurveyGroup> SurveyGroups { get; set; }
        public virtual ICollection<NotificationMessage> NotificationMessages { get; set; }
    }
}
