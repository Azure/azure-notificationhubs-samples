
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
