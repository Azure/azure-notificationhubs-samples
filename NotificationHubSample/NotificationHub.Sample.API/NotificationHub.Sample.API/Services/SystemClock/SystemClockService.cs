using System;
using Microsoft.AspNetCore.Authentication;

namespace NotificationHub.Sample.API.Services.SystemClock
{
    public class SystemClockService : ISystemClock
    {
        DateTimeOffset ISystemClock.UtcNow => DateTimeOffset.UtcNow.DateTime;
    }
}
