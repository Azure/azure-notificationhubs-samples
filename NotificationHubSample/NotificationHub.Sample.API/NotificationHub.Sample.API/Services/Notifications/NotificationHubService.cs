using Microsoft.Azure.NotificationHubs;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NotificationHub.Sample.API.Models;
using NotificationHub.Sample.API.Models.Dashboard;
using NotificationHub.Sample.API.Models.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Services.Notifications
{
    public class NotificationHubService : INotificationService
    {
        private readonly NotificationHubClient _hub;
        private readonly Dictionary<string, NotificationPlatform> _installationPlatform;
        private readonly ILogger<NotificationHubService> _logger;

        public NotificationHubService(IOptions<NotificationHubOptions> options, ILogger<NotificationHubService> logger)
        {
            _logger = logger;
            _hub = NotificationHubClient.CreateClientFromConnectionString(options.Value.ConnectionString, options.Value.Name);

            _installationPlatform = new Dictionary<string, NotificationPlatform>
            {
                { nameof(NotificationPlatform.Fcm).ToLower(), NotificationPlatform.Fcm }
            };
        }
        

        public async Task<bool> CreateOrUpdateInstallationAsync(DeviceInstallation deviceInstallation, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(deviceInstallation?.InstallationId) ||
                string.IsNullOrWhiteSpace(deviceInstallation?.Platform) ||
                string.IsNullOrWhiteSpace(deviceInstallation?.PushChannel))
                return false;

            var installation = new Installation()
            {
                InstallationId = deviceInstallation.InstallationId,
                PushChannel = deviceInstallation.PushChannel,
                Tags = deviceInstallation.Tags
            };

            if (_installationPlatform.TryGetValue(deviceInstallation.Platform, out var platform))
                installation.Platform = platform;
            else
                return false;

            try
            {
                await _hub.CreateOrUpdateInstallationAsync(installation, cancellationToken);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<bool> DeleteInstallationByIdAsync(string installationId, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(installationId))
                return false;

            try
            {
                await _hub.DeleteInstallationAsync(installationId, cancellationToken);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<List<DeviceTrend>> GetAllRegistrationInfoAsync()
        {
            List<DeviceTrend> deviceRegistrationTrends = new List<DeviceTrend>();

            int windowsRegistrationCount = 0;
            int fcmRegistrationCount = 0;
            int apnsRegistrationCount = 0;

            var allRegistrations = await _hub.GetAllRegistrationsAsync(0);
            foreach(var registration in allRegistrations)
            {
                if (registration is WindowsRegistrationDescription)
                {
                    windowsRegistrationCount++;
                }
                else if (registration is FcmRegistrationDescription)
                {
                    fcmRegistrationCount++;
                }
                else if (registration is AppleRegistrationDescription)
                {
                    apnsRegistrationCount++;
                }
            }

            deviceRegistrationTrends.Add(new DeviceTrend() { DeviceType = "Windows", RegistrationCount = windowsRegistrationCount });
            deviceRegistrationTrends.Add(new DeviceTrend() { DeviceType = "Android", RegistrationCount = fcmRegistrationCount });
            deviceRegistrationTrends.Add(new DeviceTrend() { DeviceType = "Apple", RegistrationCount = apnsRegistrationCount });

            return deviceRegistrationTrends;
        }

        public async Task<bool> RequestNotificationAsync(NotificationMessage notificationMessage, IList<string> tags, CancellationToken token)
        {
            var androidPushTemplate = PushTemplates.Generic.Android;

            var iOSPushTemplate = PushTemplates.Generic.iOS;

            var androidPayload = PrepareNotificationPayload(
                androidPushTemplate,
                notificationMessage.NotificationTitle,
                notificationMessage.NotificationDescription);

            var iOSPayload = PrepareNotificationPayload(
                iOSPushTemplate,
                notificationMessage.NotificationTitle,
                notificationMessage.NotificationDescription);

            try
            {
                if (tags.Count == 0)
                {
                    // This will broadcast to all users registered in the notification hub
                    await SendPlatformNotificationsAsync(androidPayload, iOSPayload, token);
                }
                else
                {
                    await SendPlatformNotificationsAsync(androidPayload, iOSPayload, tags, token);
                }

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Unexpected error sending notification");
                return false;
            }
        }

        private string PrepareNotificationPayload(string template, string title, string text) => template
            .Replace("$(title)", title, StringComparison.InvariantCulture)
            .Replace("$(alertMessage)", text, StringComparison.InvariantCulture);

        private Task SendPlatformNotificationsAsync(string androidPayload, string iOSPayload, CancellationToken token)
        {
            var sendTasks = new Task[]
            {
                _hub.SendFcmNativeNotificationAsync(androidPayload, token),
                //_hub.SendAppleNativeNotificationAsync(iOSPayload, token)
            };

            return Task.WhenAll(sendTasks);
        }

        Task SendPlatformNotificationsAsync(string androidPayload, string iOSPayload, IEnumerable<string> tags, CancellationToken token)
        {
            var sendTasks = new Task[]
            {
                _hub.SendFcmNativeNotificationAsync(androidPayload, tags, token),
                //_hub.SendAppleNativeNotificationAsync(iOSPayload, tags, token)
            };

            return Task.WhenAll(sendTasks);
        }
    }
}
