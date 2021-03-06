using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.NotificationHubs;
using Microsoft.EntityFrameworkCore;
using NotificationHub.Sample.API.Database;
using NotificationHub.Sample.API.Models.Authentication;
using NotificationHub.Sample.API.Models.Groups;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyGroupController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private NotificationHubClient _hub;

        public SurveyGroupController(ApplicationDbContext dbContext)
        {
            _db = dbContext;
            _hub = Notifications.Notifications.Instance.Hub;
        }

        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPost("creategroup")]
        public async Task<ActionResult> CreateSurveyGroup([FromBody] SurveyGroup surveyGroup)
        {
            try
            {
                _db.SurveyGroups.Add(surveyGroup);
                await _db.SaveChangesAsync();
                return Ok(surveyGroup);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getgroups")]
        public async Task<ActionResult> Get()
        {
            try
            {
                var surveyGroups = _db.SurveyGroups.Include(group => group.ApplicationUsers).ToList();
                surveyGroups.ForEach(group => group.ApplicationUsers.ForEach(user => group.ApplicationUserIds.Add(user.Id)));
                return Ok(surveyGroups);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getclient/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {

                var client = _db.SurveyGroups.Find(id);
                return Ok(client);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPut("updategroup")]
        public async Task<ActionResult> Update([FromBody] SurveyGroup surveyGroup)
        {
            try
            {
                var username = string.Empty;

                if (HttpContext.User.Identity is ClaimsIdentity identity)
                {
                    username = identity.FindFirst(ClaimTypes.Name).Value;
                }

                var existingGroup = await _db.SurveyGroups.Include(group => group.ApplicationUsers).Where(group => group.Id == surveyGroup.Id).FirstOrDefaultAsync();

                existingGroup.GroupName = surveyGroup.GroupName;

                // update associated users
                var users = _db.Users.Where(user => surveyGroup.ApplicationUserIds.Contains(user.Id)).ToList();

                // remove users which have been removed from the group
                List<ApplicationUser> usersToRemove = new List<ApplicationUser>();

                foreach (var user in existingGroup.ApplicationUsers)
                {
                    if (!surveyGroup.ApplicationUserIds.Contains(user.Id))
                    {
                        usersToRemove.Add(user);
                    }
                }

                usersToRemove.ForEach(user => existingGroup.ApplicationUsers.Remove(user));

                foreach (var user in usersToRemove)
                {
                    if (!string.IsNullOrEmpty(user.RegistrationId))
                    {
                        var registrationDescription = await _hub.GetRegistrationAsync<RegistrationDescription>(user.RegistrationId);
                        if (registrationDescription.Tags.Contains($"group:{existingGroup.GroupName.Replace(' ', '-')}"))
                        {
                            registrationDescription.Tags.Remove($"group:{existingGroup.GroupName.Replace(' ', '-')}");
                            await _hub.CreateOrUpdateRegistrationAsync(registrationDescription);
                        }
                    }
                }

                // users to add
                foreach (var user in users)
                {
                    if (existingGroup.ApplicationUsers.Where(usr => usr.Id == user.Id).Count() == 0)
                    {
                        existingGroup.ApplicationUsers.Add(user);
                    }
                }

                foreach (var user in existingGroup.ApplicationUsers)
                {
                    if (!string.IsNullOrEmpty(user.RegistrationId))
                    {
                        var registrationDescription = await _hub.GetRegistrationAsync<RegistrationDescription>(user.RegistrationId);
                        if (!registrationDescription.Tags.Contains($"group:{existingGroup.GroupName.Replace(' ','-')}"))
                        {
                            registrationDescription.Tags.Add($"group:{existingGroup.GroupName.Replace(' ', '-')}");
                            await _hub.CreateOrUpdateRegistrationAsync(registrationDescription);
                        }
                    }
                }

                _db.Entry(existingGroup).State = EntityState.Modified;
                await _db.SaveChangesAsync();
                return Ok(existingGroup);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
