using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotificationHub.Sample.API.Database;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public UsersController(ApplicationDbContext dbContext)
        {
            _db = dbContext;
        }

        [Produces("application/json")]
        [HttpGet("getusers")]
        public async Task<ActionResult> Get()
        {
            try
            {
                var users = _db.Users.Include(user => user.SurveyGroups).ToList();
                var userrolesmaster = _db.Roles.ToList();
                var userroles = _db.UserRoles.ToList();

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
