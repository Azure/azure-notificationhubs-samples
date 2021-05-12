
Notification controller is used to send and get notification.
----------------------------------------------------------------------
```
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
---------------------------------------------------------------------------
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
```