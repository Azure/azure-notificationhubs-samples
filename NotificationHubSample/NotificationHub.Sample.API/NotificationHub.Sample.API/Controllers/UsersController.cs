using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NotificationHub.Sample.API.Database;
using NotificationHub.Sample.API.Models.Authentication;
using NotificationHub.Sample.API.Models.Common;

namespace NotificationHub.Sample.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public UsersController(ApplicationDbContext _dbContext)
        {
            db = _dbContext;
        }

        [Produces("application/json")]
        [HttpGet("getusers")]
        public async Task<ActionResult> Get()
        {
            try
            {
                var users = db.Users.Include(user => user.SurveyGroups).ToList();
                var userrolesmaster = db.Roles.ToList();
                var userroles = db.UserRoles.ToList();

                foreach (var user in users)
                {
                    var userrole = userroles.Where(x => x.UserId == user.Id).FirstOrDefault();
                    if (userrole != null)
                    {
                        //user.Role = userrolesmaster.Where(x => x.Id == userrole.RoleId).FirstOrDefault().Name;
                    }
                    else
                    {
                        //user.Role = "Site-Manager";
                    }
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}