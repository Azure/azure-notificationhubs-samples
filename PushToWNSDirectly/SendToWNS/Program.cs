using System;
using System.IO;
using System.Net;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;

// This is based on the Quickstart described here 
//    - http://msdn.microsoft.com/en-us/library/windows/apps/xaml/hh868252.aspx 

namespace SendToWNS
{
    class Program
    {
        static void Main(string[] args)
        {
            // Secret & Package SID you get from here - http://go.microsoft.com/fwlink/p/?linkid=266582&clcid=0x409
            //  for your Windows app
            string secret = ".....";
            string sid = "ms-app://....";

            // Notification payload, type & contentType
            //  More on this here :
            //      http://msdn.microsoft.com/en-us/library/windows/apps/xaml/hh868245.aspx#pncodes_x_wns_type
            // Example below uses toast notification
            string xml = @"<toast><visual><binding template=""ToastText01""><text id=""1"">Hello there!</text></binding></visual></toast>";
            string notificationType = "wns/toast";
            string contentType = "text/xml";

            // The channel URI you got from WNS for your client app 
            string channelUri = "https://bn1.notify.windows.com/?token=AwYAAACcrAdWJXBTMFyx%2bzt9KJyklBvelWQVeOt%xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYzG%2beM0WGuLzdUlqVRxdwrE%3d";
            
            Console.WriteLine(PostToWns(secret, sid, channelUri, xml, notificationType, contentType));
            Console.Read();
        }

        // Post to WNS
        static string PostToWns(string secret, string sid, string uri, 
                    string xml, string notificationType, string contentType)
        {
            try
            {
                // You should cache this access token.
                var accessToken = GetAccessToken(secret, sid);

                byte[] contentInBytes = Encoding.UTF8.GetBytes(xml);

                HttpWebRequest request = HttpWebRequest.Create(uri) as HttpWebRequest;
                request.Method = "POST";
                request.Headers.Add("X-WNS-Type", notificationType);
                request.ContentType = contentType;
                request.Headers.Add("Authorization", String.Format("Bearer {0}", accessToken.AccessToken));

                using (Stream requestStream = request.GetRequestStream())
                    requestStream.Write(contentInBytes, 0, contentInBytes.Length);

                using (HttpWebResponse webResponse = (HttpWebResponse)request.GetResponse())
                    return webResponse.StatusCode.ToString();
            }

            catch (WebException webException)
            {
                HttpStatusCode status = ((HttpWebResponse)webException.Response).StatusCode;

                if (status == HttpStatusCode.Unauthorized)
                {
                    // The access token you presented has expired. Get a new one and then try sending
                    // your notification again.

                    // Because your cached access token expires after 24 hours, you can expect to get 
                    // this response from WNS at least once a day.

                    GetAccessToken(secret, sid);

                    // We recommend that you implement a maximum retry policy.
                    return PostToWns(uri, xml, secret, sid, notificationType, contentType);
                }
                else if (status == HttpStatusCode.Gone || status == HttpStatusCode.NotFound)
                {
                    // The channel URI is no longer valid.

                    // Remove this channel from your database to prevent further attempts
                    // to send notifications to it.

                    // The next time that this user launches your app, request a new WNS channel.
                    // Your app should detect that its channel has changed, which should trigger
                    // the app to send the new channel URI to your app server.

                    return "";
                }
                else if (status == HttpStatusCode.NotAcceptable)
                {
                    // This channel is being throttled by WNS.

                    // Implement a retry strategy that exponentially reduces the amount of
                    // notifications being sent in order to prevent being throttled again.

                    // Also, consider the scenarios that are causing your notifications to be throttled. 
                    // You will provide a richer user experience by limiting the notifications you send 
                    // to those that add true value.

                    return "";
                }
                else
                {
                    // WNS responded with a less common error. Log this error to assist in debugging.

                    // You can see a full list of WNS response codes here:
                    // http://msdn.microsoft.com/en-us/library/windows/apps/hh868245.aspx#wnsresponsecodes

                    string[] debugOutput = {
                                       status.ToString(),
                                       webException.Response.Headers["X-WNS-Debug-Trace"],
                                       webException.Response.Headers["X-WNS-Error-Description"],
                                       webException.Response.Headers["X-WNS-Msg-ID"],
                                       webException.Response.Headers["X-WNS-Status"]
                                   };
                    return string.Join(" | ", debugOutput);
                }
            }

            catch (Exception ex)
            {
                return "EXCEPTION: " + ex.Message;
            }
        }

        // Authorization
        [DataContract]
        public class OAuthToken
        {
            [DataMember(Name = "access_token")]
            public string AccessToken { get; set; }
            [DataMember(Name = "token_type")]
            public string TokenType { get; set; }
        }

        private static OAuthToken GetOAuthTokenFromJson(string jsonString)
        {
            using (var ms = new MemoryStream(Encoding.Unicode.GetBytes(jsonString)))
            {
                var ser = new DataContractJsonSerializer(typeof(OAuthToken));
                var oAuthToken = (OAuthToken)ser.ReadObject(ms);
                return oAuthToken;
            }
        }
        protected static OAuthToken GetAccessToken(string secret, string sid)
        {
            var urlEncodedSecret = HttpUtility.UrlEncode(secret);
            var urlEncodedSid = HttpUtility.UrlEncode(sid);

            var body = String.Format("grant_type=client_credentials&client_id={0}&client_secret={1}&scope=notify.windows.com",
                                     urlEncodedSid,
                                     urlEncodedSecret);

            string response;
            using (var client = new WebClient())
            {
                client.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
                response = client.UploadString("https://login.live.com/accesstoken.srf", body);
            }
            return GetOAuthTokenFromJson(response);
        }
    }
}
