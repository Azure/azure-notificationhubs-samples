using Microsoft.EntityFrameworkCore.Migrations;

namespace NotificationHub.Sample.API.Migrations
{
    public partial class RegistrationId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RegistrationId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegistrationId",
                table: "AspNetUsers");
        }
    }
}
