using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Models.Groups
{
    public class GroupUserAssociation
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string UserId { get; set; }
    }
}
