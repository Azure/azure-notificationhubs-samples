using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NotificationHub.Sample.API.Models.Authentication;
using NotificationHub.Sample.API.Models.Groups;
using NotificationHub.Sample.API.Models.Notifications;

namespace NotificationHub.Sample.API.Database
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<SurveyGroup> SurveyGroups { get; set; }
        public DbSet<NotificationMessage> NotificationMessages { get; set; }
    }
}
