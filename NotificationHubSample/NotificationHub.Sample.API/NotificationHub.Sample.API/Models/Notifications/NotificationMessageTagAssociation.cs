using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Models.Notifications
{
    public class NotificationMessageTagAssociation
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int GroupId { get; set; }
        public int NotificationId { get; set; }
    }
}
