using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NotificationHub.Sample.API.Models.Authentication;
using NotificationHub.Sample.API.Models.Common;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NotificationHub.Sample.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
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

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
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

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.SiteManager))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.SiteManager));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully." });
        }

        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Invalid request!" });

            var user = await userManager.FindByEmailAsync(resetPasswordModel.Email);
            if (user == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User does not exist!" });

            var resetPassResult = await userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.Password);

            if (!resetPassResult.Succeeded)
            {
                foreach (var error in resetPassResult.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Invalid request!" });
            }
            return Ok(new Response { Status = "Success", Message = "Password reset successfully!" });
        }

        [HttpPost]
        [Route("resetpasswordapp")]
        public async Task<IActionResult> ResetPasswordApp(ResetPasswordModel resetPasswordModel)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Invalid request!" });

            var user = await userManager.FindByEmailAsync(resetPasswordModel.Email);
            if (user == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User does not exist!" });

            string resetToken = await userManager.GeneratePasswordResetTokenAsync(user);

            var resetPassResult = await userManager.ResetPasswordAsync(user, resetToken, resetPasswordModel.Password);

            if (!resetPassResult.Succeeded)
            {
                foreach (var error in resetPassResult.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Invalid request!" });
            }
            return Ok(new Response { Status = "Success", Message = "Password reset successfully!" });
        }
    }
}
