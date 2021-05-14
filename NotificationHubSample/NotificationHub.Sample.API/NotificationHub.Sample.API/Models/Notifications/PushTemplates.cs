
namespace NotificationHub.Sample.API.Models
{
    public class PushTemplates
    {
        public class Generic
        {
            public const string Android = "{ \"notification\": { \"title\" : \"$(title)\", \"body\" : \"$(alertMessage)\"} }";
            public const string iOS = "{ \"aps\" : {\"alert\" : \"$(alertMessage)\"} }";
        }

        public class Silent
        {
            public const string Android = "{ \"data\" : {\"message\" : \"$(alertMessage)\"} }";
            public const string iOS = "{ \"aps\" : {\"content-available\" : 1, \"apns-priority\": 5, \"sound\" : \"\", \"badge\" : 0}, \"message\" : \"$(alertMessage)\" }";
        }
    }
}
