using Microsoft.AspNetCore.Mvc;
using NotificationHub.Sample.API.Database;
using NotificationHub.Sample.API.Models.Dashboard;
using NotificationHub.Sample.API.Services.Notifications;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly INotificationService _notificationService;

        public DashboardController(ApplicationDbContext dbContext, INotificationService notificationService)
        {
            _db = dbContext;
            _notificationService = notificationService;
        }

        [HttpGet("insights")]
        public async Task<IActionResult> GetDashboardInsight(string duration)
        {
            DashboardInsight dashboardInsight = new DashboardInsight();

            dashboardInsight.DeviceTrends = await _notificationService.GetAllRegistrationInfoAsync();

            var notificationMessages = _db.NotificationMessages.ToList();

            switch (duration)
            {
                case "Daily":
                    {
                        dashboardInsight.NotificationTrends = _db.NotificationMessages
                                                                .GroupBy(m => m.SentTime.Date)
                                                                .Select(m => new NotificationTrend()
                                                                {
                                                                    Timestamp = m.Key.ToShortDateString(),
                                                                    NotificationsSent = m.Count()
                                                                }).ToList();
                    }
                    break;
                case "Weekly":
                    {
                        dashboardInsight.NotificationTrends = notificationMessages
                                                                .GroupBy(m => WeekNumber(m.SentTime.Date))
                                                                .Select(m => new NotificationTrend()
                                                                {
                                                                    Timestamp = FirstDateOfWeekISO8601(DateTime.Now.Year, m.Key).DateTime.ToShortDateString(),
                                                                    NotificationsSent = m.Count()
                                                                }).ToList();
                    }
                    break;
                case "Monthly":
                    {
                        dashboardInsight.NotificationTrends = _db.NotificationMessages
                                                                .GroupBy(m => m.SentTime.Date.Month)
                                                                .Select(m => new NotificationTrend()
                                                                {
                                                                    Timestamp = m.Key + "-" + DateTime.Now.Year,
                                                                    NotificationsSent = m.Count()
                                                                }).ToList();
                    }
                    break;
                default:
                    break;
            }

            dashboardInsight.TotalGroups = _db.SurveyGroups.Count();
            dashboardInsight.TotalUsers = _db.Users.Count();
            dashboardInsight.TotalNotificationsSent = _db.NotificationMessages.Count();

            return Ok(dashboardInsight);
        }

        private DateTimeOffset FirstDateOfWeekISO8601(int year, int weekOfYear)
        {
            DateTimeOffset jan1 = new DateTimeOffset(year, 1, 1, 0, 0, 0, TimeSpan.Zero);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;

            // Use first Thursday in January to get first week of the year as
            // it will never be in Week 52/53
            DateTimeOffset firstThursday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday.DateTime, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = weekOfYear;
            // As we're adding days to a date in Week 1,
            // we need to subtract 1 in order to get the right date for week #1
            if (firstWeek == 1)
            {
                weekNum -= 1;
            }

            // Using the first Thursday as starting week ensures that we are starting in the right year
            // then we add number of weeks multiplied with days
            var result = firstThursday.AddDays(weekNum * 7);

            // Subtract 3 days from Thursday to get Monday, which is the first weekday in ISO8601
            return result.AddDays(-3);
        }

        private int WeekNumber(DateTime date)
        {
            Calendar cal = CultureInfo.InvariantCulture.Calendar;
            DayOfWeek day = cal.GetDayOfWeek(date);
            date = date.AddDays(4 - ((int)day == 0 ? 7 : (int)day));
            return cal.GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }
    }
}
