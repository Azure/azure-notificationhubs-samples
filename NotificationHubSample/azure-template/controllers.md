1) To authenticate logged in user we are doing basic authication using below methods.
---------------------------------------------------------------------------
```C#
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await userManager.FindByNameAsync(model.Username);
        if (user != null && await userManager.CheckPasswordAsync(user, model.  Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                UserDetails userDetails = new UserDetails();
                userDetails.FirstName = model.Username;
                userDetails.LastName = model.Username;
                userDetails.UserName = model.Username;

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    username = model.Username,
                    email = user.Email,
                    role = userRoles != null ? userRoles[0] : "Site-Manager",
                    user = userDetails
                });
            }
        return Unauthorized();
    }
    ---------------------------------------------------------------------
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await roleManager.RoleExistsAsync(UserRoles.SiteManager))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.SiteManager));

            if (await roleManager.RoleExistsAsync(UserRoles.SiteManager))
            {
                await userManager.AddToRoleAsync(user, UserRoles.SiteManager);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
```
2) Dashboard controller is used to return all notification information.
------------------------------------------------------------------------
```C#
public class DashboardInsight
{
    public int TotalNotificationsSent { get; set; }
    public int TotalGroups { get; set; }
    public int TotalUsers { get; set; }

    public List<NotificationTrend> NotificationTrends { get; set; }
    public List<DeviceTrend> DeviceTrends { get; set; }
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
                                                                    Timestamp = FirstDateOfWeekISO8601(DateTime.Now.Year, m.Key).ToShortDateString(),
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

```