using Microsoft.Phone.Controls;
using System;
using System.Diagnostics;
using Windows.Networking.PushNotifications;

namespace SilverlightPhoneAppPushNotification
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();

            // Register with Azure Notification Hubs
            RegisterToReceiveNotifications();
        }

        public async void RegisterToReceiveNotifications()
        {
            string notificationHubName = "[hubName]";
            string connectionString = "[ConnectionString-DefaultListenSharedAccessSignature]";

            // Register with WNS
            var channel = await PushNotificationChannelManager.CreatePushNotificationChannelForApplicationAsync();
            
            // Register with Azure Notification Hubs
            NotificationHub hub = new NotificationHub(notificationHubName, connectionString);
            hub.Register(channel.Uri);
            Debug.WriteLine("ChannelURI : {0}", channel.Uri);
        }
    }
}