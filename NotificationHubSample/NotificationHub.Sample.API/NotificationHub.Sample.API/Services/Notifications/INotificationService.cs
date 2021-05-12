using NotificationHub.Sample.API.Models.Dashboard;
using NotificationHub.Sample.API.Models.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Services.Notifications
{
    public interface INotificationService
    {
        Task<bool> CreateOrUpdateInstallationAsync(DeviceInstallation deviceInstallation, CancellationToken cancellationToken);
        Task<bool> DeleteInstallationByIdAsync(string installationId, CancellationToken cancellationToken);
        Task<bool> RequestNotificationAsync(NotificationMessage notificationMessage, IList<string> tags, CancellationToken cancellationToken);
        Task<List<DeviceTrend>> GetAllRegistrationInfoAsync();
    }
}
