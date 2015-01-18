using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace SilverlightPhoneAppPushNotification
{
    class NotificationHub
    {
        private const string ApiVersion = "?api-version=2014-09";
        private const string AuthHeader = "Authorization";
        private const string ContentType = "application/atom+xml;type=entry;charset=utf-8";

        static string HubName { get; set; }
        static string ConnectionString { get; set; }
        static string Endpoint { get; set; }
        static string SasKeyName { get; set; }
        static string SasKeyValue { get; set; }
        static string Payload { get; set; } 

        public NotificationHub(string hubName, string connectionString)
        {
            HubName = hubName;
            ConnectionString = connectionString;
        }

        public void Register(string pushChannel) 
        {
            ParseConnectionInfo();
            SendNHRegistrationRequest(pushChannel);
        }

        // From http://msdn.microsoft.com/en-us/library/dn495627.aspx 
        private static void ParseConnectionInfo()
        {
            if (string.IsNullOrWhiteSpace(HubName))
            {
                throw new InvalidOperationException("Hub name is empty");
            }

            var parts = ConnectionString.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries);

            if (parts.Length != 3)
            {
                throw new InvalidOperationException("Error parsing connection string: " + ConnectionString);
            }

            foreach (var part in parts)
            {
                if (part.StartsWith("Endpoint"))
                {
                    Endpoint = "https" + part.Substring(11);
                }
                else if (part.StartsWith("SharedAccessKeyName"))
                {
                    SasKeyName = part.Substring(20);
                }
                else if (part.StartsWith("SharedAccessKey"))
                {
                    SasKeyValue = part.Substring(16);
                }
            }
        }
        private static string GenerateSaSToken(Uri uri)
        {
            var targetUri = WebUtility.UrlEncode(uri.ToString().ToLower()).ToLower();
            
            var expiresOnDate = Convert.ToInt64(DateTime.UtcNow.Subtract
                (new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds) + 60 * 60;
            var toSign = targetUri + "\n" + expiresOnDate;

            var keyBytes = Encoding.UTF8.GetBytes(SasKeyValue);
            var mac = new HMACSHA256(keyBytes);
            mac.Initialize();
            var rawHmac = mac.ComputeHash(Encoding.UTF8.GetBytes(toSign));
            var signature = WebUtility.UrlEncode(Convert.ToBase64String(rawHmac));

            var token = "SharedAccessSignature sr=" + targetUri + "&sig=" 
                    + signature + "&se=" + expiresOnDate + "&skn=" + SasKeyName;
            return token;
        }

        private static void SendNHRegistrationRequest(string pushChannel)
        {
            Payload =
            @"<?xml version=""1.0"" encoding=""utf-8""?>
            <entry xmlns=""http://www.w3.org/2005/Atom"">
              <content type=""application/xml"">
                <WindowsRegistrationDescription xmlns:i=""http://www.w3.org/2001/XMLSchema-instance"" xmlns=""http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"">
                  <ChannelUri>{WindowsPushChannel}</ChannelUri>
                </WindowsRegistrationDescription >
              </content>
            </entry>";

            Payload = Payload.Replace("{WindowsPushChannel}", pushChannel);

            var uri = new Uri(Endpoint + HubName + "/registrations/" + ApiVersion);
            var sendRequest = WebRequest.CreateHttp(uri);
            sendRequest.Method = "POST";
            sendRequest.ContentType = ContentType;
            sendRequest.Headers[AuthHeader] = GenerateSaSToken(uri);
            sendRequest.BeginGetRequestStream(new AsyncCallback(GetRequestStreamCallback), sendRequest);
        }

        static void GetRequestStreamCallback(IAsyncResult asynchronousResult)
        {
            HttpWebRequest request = (HttpWebRequest)asynchronousResult.AsyncState;
            // End the stream request operation
            Stream postStream = request.EndGetRequestStream(asynchronousResult);

            byte[] byteArray = Encoding.UTF8.GetBytes(Payload);

            postStream.Write(byteArray, 0, byteArray.Length);
            postStream.Close();

            //Start the web request
            request.BeginGetResponse(new AsyncCallback(GetResponceStreamCallback), request);
        }

        static void GetResponceStreamCallback(IAsyncResult callbackResult)
        {
            HttpWebRequest request = (HttpWebRequest)callbackResult.AsyncState;
            HttpWebResponse response = (HttpWebResponse)request.EndGetResponse(callbackResult);
            using (StreamReader httpWebStreamReader = new StreamReader(response.GetResponseStream()))
            {
                string result = httpWebStreamReader.ReadToEnd();
                //For debug: show results
                Debug.WriteLine(result);
            }
        }
    }
}
