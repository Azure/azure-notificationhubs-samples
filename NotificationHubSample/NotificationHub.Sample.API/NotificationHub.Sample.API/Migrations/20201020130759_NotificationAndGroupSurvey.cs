using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NotificationHub.Sample.API.Migrations
{
    public partial class NotificationAndGroupSurvey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NotificationMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotificationTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotificationDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SentTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SurveyGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserNotificationMessage",
                columns: table => new
                {
                    NotificationMessagesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserNotificationMessage", x => new { x.NotificationMessagesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserNotificationMessage_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserNotificationMessage_NotificationMessages_NotificationMessagesId",
                        column: x => x.NotificationMessagesId,
                        principalTable: "NotificationMessages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserSurveyGroup",
                columns: table => new
                {
                    ApplicationUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SurveyGroupsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserSurveyGroup", x => new { x.ApplicationUsersId, x.SurveyGroupsId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserSurveyGroup_AspNetUsers_ApplicationUsersId",
                        column: x => x.ApplicationUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserSurveyGroup_SurveyGroups_SurveyGroupsId",
                        column: x => x.SurveyGroupsId,
                        principalTable: "SurveyGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NotificationMessageSurveyGroup",
                columns: table => new
                {
                    NotificationMessagesId = table.Column<int>(type: "int", nullable: false),
                    SurveyGroupsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationMessageSurveyGroup", x => new { x.NotificationMessagesId, x.SurveyGroupsId });
                    table.ForeignKey(
                        name: "FK_NotificationMessageSurveyGroup_NotificationMessages_NotificationMessagesId",
                        column: x => x.NotificationMessagesId,
                        principalTable: "NotificationMessages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotificationMessageSurveyGroup_SurveyGroups_SurveyGroupsId",
                        column: x => x.SurveyGroupsId,
                        principalTable: "SurveyGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserNotificationMessage_UsersId",
                table: "ApplicationUserNotificationMessage",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserSurveyGroup_SurveyGroupsId",
                table: "ApplicationUserSurveyGroup",
                column: "SurveyGroupsId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationMessageSurveyGroup_SurveyGroupsId",
                table: "NotificationMessageSurveyGroup",
                column: "SurveyGroupsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserNotificationMessage");

            migrationBuilder.DropTable(
                name: "ApplicationUserSurveyGroup");

            migrationBuilder.DropTable(
                name: "NotificationMessageSurveyGroup");

            migrationBuilder.DropTable(
                name: "NotificationMessages");

            migrationBuilder.DropTable(
                name: "SurveyGroups");
        }
    }
}
