using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.NotificationHubs.Messaging;
using Microsoft.EntityFrameworkCore;
using NotificationHub.Sample.API.Database;
using NotificationHub.Sample.API.Models.Notifications;
using NotificationHub.Sample.API.Services.Notifications;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly INotificationService _notificationService;

        public NotificationController(ApplicationDbContext dbContext, INotificationService notificationService)
        {
            _db = dbContext;
            _notificationService = notificationService;
        }

        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPost("send")]
        public async Task<ActionResult> SendNotification([FromBody] NotificationMessage notificationMessage)
        {
            try
            {
                List<string> tags = new List<string>();

                // attach survey group and user information with notificationMessage
                notificationMessage.SurveyGroupTags.ForEach(surveyGroupId =>
                {
                    var group = _db.SurveyGroups.Where(g => g.Id == surveyGroupId).FirstOrDefault();
                    if (group != null)
                    {
                        notificationMessage.SurveyGroups.Add(group);
                        tags.Add($"group:{group.GroupName.Replace(' ', '-')}");
                    }
                });

                notificationMessage.UserTags.ForEach(userId =>
                {
                    var user = _db.Users.Where(u => u.Id == userId).FirstOrDefault();
                    if (user != null)
                    {
                        notificationMessage.Users.Add(user);
                        tags.Add($"username:{user.UserName}");
                    }
                });
                _db.NotificationMessages.Add(notificationMessage);

                // send template notification
                var notification = new Dictionary<string, string>();
                notification.Add("title", notificationMessage.NotificationTitle);
                notification.Add("message", notificationMessage.NotificationDescription);

                var res = await _notificationService.RequestNotificationAsync(notificationMessage, tags, HttpContext.RequestAborted);

                await _db.SaveChangesAsync();
                return Ok(notificationMessage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Produces("application/json")]
        [HttpGet("get")]
        public async Task<ActionResult> Get()
        {
            try
            {
                var surveyGroups = _db.NotificationMessages.Include(message => message.SurveyGroups).Include(message => message.Users).ToList();
                return Ok(surveyGroups);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("installations")]
        public async Task<IActionResult> UpdateInstallation([Required] DeviceInstallation deviceInstallation)
        {
            var username = string.Empty;

            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                username = identity.FindFirst(ClaimTypes.Name).Value;
            }

            List<string> tags = new List<string>();
            tags.Add($"username:{username}");

            // find groups associated
            var groupsForUser = _db.SurveyGroups.Where(group => group.ApplicationUsers.Where(user => user.UserName == username).FirstOrDefault() != null).ToList();

            foreach (var group in groupsForUser)
            {
                tags.Add("group:" + group.GroupName.Replace(' ', '-'));
            }

            deviceInstallation.Tags = tags;

            var success = await _notificationService.CreateOrUpdateInstallationAsync(deviceInstallation, HttpContext.RequestAborted);

            if (!success)
                return new UnprocessableEntityResult();

            return new OkResult();
        }

        [HttpDelete]
        [Route("installations/{installationId}")]
        public async Task<IActionResult> DeleteInstallation([Required][FromRoute] string installationId)
        {
            var success = await _notificationService.DeleteInstallationByIdAsync(installationId, HttpContext.RequestAborted);

            if (!success)
                return new UnprocessableEntityResult();

            return new OkResult();
        }

        private static void ReturnGoneIfHubResponseIsGone(MessagingException e)
        {
            var webex = e.InnerException as WebException;
            if (webex.Status == WebExceptionStatus.ProtocolError)
            {
                var response = (HttpWebResponse)webex.Response;
                if (response.StatusCode == HttpStatusCode.Gone)
                    throw new HttpRequestException(HttpStatusCode.Gone.ToString());
            }
        }
    }
}
