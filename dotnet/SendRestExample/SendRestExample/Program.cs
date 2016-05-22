using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Azure;
using System.Net;
using System.IO;
using System.Xml;

namespace SendRestExample
{
    class Program
    {
        static void Main(string[] args)
        {
            // Parse the hubname and connection string.
            string hubName = CloudConfigurationManager.GetSetting("HubName");
            string fullConnectionString = CloudConfigurationManager.GetSetting("DefaultFullSharedAccessSignature");


            // Example sending a native notification
            Console.WriteLine("\nNotification Message ID : ");
            //String messageId = SendNativeNotificationREST(hubName, fullConnectionString, "Hello From REST", "GCM").Result;
            //String messageId = SendNativeNotificationREST(hubName, fullConnectionString, "Hello From REST", "WNS").Result;
            String messageId = SendNativeNotificationREST(hubName, fullConnectionString, "Hello From REST", "APNS").Result;

            if (messageId != null)
                Console.WriteLine(messageId + "\n");
            else
                //https://azure.microsoft.com/pricing/details/notification-hubs
                Console.WriteLine("No message Id retrieved.  Is telemetry enabled on your notification hub tier?\n");


            //Better to send one template notification that can be received by all platforms
            // *** Add Template Example ***


            // Get telemetry on the notification. Useful for troubleshooting.
            if (messageId != null)
            {
                Console.WriteLine("\nWaiting 0.5 minutes before retrieving telemetry on the notification...\n");
                System.Threading.Thread.Sleep(1000 * 30);
                Console.WriteLine("Telemetry for " + messageId + "\n");
                HttpWebResponse telemetryResponse = GetNotificationTelemtry(messageId, hubName, fullConnectionString).Result;
                DisplayResponseBody(telemetryResponse);
            }


            // Pull all PNS feedback for the hub. Useful for troubleshooting.
            Console.Write("\nPress enter to pull all PNS feedback from the hub...");
            Console.ReadLine();
            string containerUri = GetPlatformNotificationServiceFeedbackContainer(hubName, fullConnectionString).Result;
            if (containerUri != null)
            {
                Console.WriteLine("\nPNS Feedback Container URI :\n" + containerUri);
                WalkBlobContainer(containerUri).Wait();
            }
        }

        private static async Task<string> SendNativeNotificationREST(string hubname, string connectionString, string message, string nativeType)
        {
            ConnectionStringUtility connectionSaSUtil = new ConnectionStringUtility(connectionString);
            string location = null;

            string hubResource = "messages/?";
            string apiVersion = "api-version=2015-04";
            string notificationId = "Failed to get Notification Id";

            //=== Generate SaS Security Token for Authentication header ===
            // Determine the targetUri that we will sign
            string uri = connectionSaSUtil.Endpoint + hubname + "/" + hubResource + apiVersion;

            // 10 min expiration
            string SasToken = connectionSaSUtil.getSaSToken(uri, 10);

            WebHeaderCollection headers = new WebHeaderCollection();
            string body;
            HttpWebResponse response = null;

            switch (nativeType.ToLower())
            {

                case "apns":
                    headers.Add("ServiceBusNotification-Format", "apple");
                    body = "{\"aps\":{\"alert\":\"" + message + "\"}}";
                    response = await ExecuteREST("POST", uri, SasToken, headers, body);
                    break;

                case "gcm":
                    headers.Add("ServiceBusNotification-Format", "gcm");
                    body = "{\"data\":{\"message\":\"" + message + "\"}}";
                    response = await ExecuteREST("POST", uri, SasToken, headers, body);
                    break;

                case "wns":
                    headers.Add("X-WNS-Type", "wns/toast");
                    headers.Add("ServiceBusNotification-Format", "windows");
                    body = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>" +
                            "<toast>" +
                                "<visual>" +
                                    "<binding template=\"ToastText01\">" +
                                        "<text id=\"1\">" +
                                            message +
                                        "</text>" +
                                    "</binding>" +
                                "</visual>" +
                            "</toast>";
                    response = await ExecuteREST("POST", uri, SasToken, headers, body, "application/xml");
                    break;
            }

            char[] seps1 = { '?' };
            char[] seps2 = { '/' };

            if ((int)response.StatusCode != 201)
            {
                return string.Format("Failed to get notification message id - Http Status {0} : {1}", (int)response.StatusCode, response.StatusCode.ToString());
            }

            if ((location = response.Headers.Get("Location")) != null)
            {
                string[] locationUrl = location.Split(seps1);
                string[] locationParts = locationUrl[0].Split(seps2);

                notificationId = locationParts[locationParts.Length - 1];

                return notificationId;
            }
            else
                return null;
        }

        private static async Task<HttpWebResponse> GetNotificationTelemtry(string id, string hubname, string connectionString)
        {
            string hubResource = "messages/" + id + "?";
            string apiVersion = "api-version=2015-04";
            ConnectionStringUtility connectionSasUtil = new ConnectionStringUtility(connectionString);

            //=== Generate SaS Security Token for Authentication header ===
            // Determine the targetUri that we will sign
            string uri = connectionSasUtil.Endpoint + hubname + "/" + hubResource + apiVersion;
            string SasToken = connectionSasUtil.getSaSToken(uri, 60);

            return await ExecuteREST("GET", uri, SasToken);
        }


        private static async Task<string> GetPlatformNotificationServiceFeedbackContainer(string hubName, string connectionString)
        {
            HttpWebResponse response = null;
            ConnectionStringUtility connectionSasUtil = new ConnectionStringUtility(connectionString);

            string hubResource = "feedbackcontainer?";
            string apiVersion = "api-version=2015-04";

            //=== Generate SaS Security Token for Authentication header ===
            // Determine the targetUri that we will sign
            string uri = connectionSasUtil.Endpoint + hubName + "/" + hubResource + apiVersion;

            // 10 min expiration
            string SasToken = connectionSasUtil.getSaSToken(uri, 10);
            response = await ExecuteREST("GET", uri, SasToken);

            if ((int)response.StatusCode != 200)
            {
                Console.WriteLine(string.Format("Failed to get PNS feedback contaioner URI - Http Status {0} : {1}", 
                    (int)response.StatusCode, response.StatusCode));

                // Get the stream associated with the response.
                Stream errorStream = response.GetResponseStream();

                // Pipes the stream to a higher level stream reader with the required encoding format. 
                StreamReader errorReader = new StreamReader(errorStream, Encoding.UTF8);
                Console.WriteLine("\n" + errorReader.ReadToEnd());

                return null;
            }

            // Get the stream associated with the response.
            Stream receiveStream = response.GetResponseStream();

            // Pipes the stream to a higher level stream reader with the required encoding format. 
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            Console.WriteLine("");
            string containerUri = readStream.ReadToEnd();

            readStream.Close();
            receiveStream.Close();
            return containerUri;
        }

        private static async Task WalkBlobContainer(string containerUri)
        {
            string listcontainerUri = containerUri + "&restype=container&comp=list";

            HttpWebResponse response = await ExecuteREST("GET", listcontainerUri, null);

            // Get Blob name
            Stream receiveStreamContainer = null;
            StreamReader readStreamContainer = null;

            if (((int)response.StatusCode == 200) && response.ContentType.Contains("application/xml"))
            {
                // Get the stream associated with the response.
                receiveStreamContainer = response.GetResponseStream();

                // Pipes the stream to a higher level stream reader with the required encoding format. 
                readStreamContainer = new StreamReader(receiveStreamContainer, Encoding.UTF8);

                if (readStreamContainer != null)
                {
                    XmlDocument xml = new XmlDocument();
                    xml.LoadXml(readStreamContainer.ReadToEnd());
                    readStreamContainer.Close();
                    receiveStreamContainer.Close();

                    StringBuilder sb = new StringBuilder();
                    XmlWriterSettings settings = new XmlWriterSettings
                    {
                        Indent = true,
                        IndentChars = "  ",
                        NewLineChars = "\r\n",
                        NewLineHandling = NewLineHandling.Replace
                    };

                    using (XmlWriter writer = XmlWriter.Create(sb, settings))
                    {
                        xml.Save(writer);
                    }

                    Console.WriteLine(sb.ToString() + "\n\n");


                    XmlNodeList list = xml.GetElementsByTagName("Blob");

                    string[] parts = null;
                    char[] seps = { '?' };
                    string blobURL = null;

                    foreach (XmlNode node in list)
                    {
                        Console.WriteLine("Get Blob named : " + node["Name"].InnerText);
                        parts = containerUri.Split(seps);
                        blobURL = parts[0] + "/" + node["Name"].InnerText + "?" + parts[1];
                        Console.WriteLine("Blob URL : " + blobURL);
                        response = await ExecuteREST("GET", blobURL, null);
                        DisplayResponseBody(response);
                    }
                }
            }
        }



        private static async Task<HttpWebResponse> ExecuteREST(string httpMethod, string uri, string sasToken, WebHeaderCollection headers = null, string body = null, string contentType = "application/json")
        {
            //=== Execute the request 

            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(uri);
            HttpWebResponse response = null;

            request.Method = httpMethod;
            request.ContentType = contentType;
            request.ContentLength = 0;

            if (sasToken != null)
                request.Headers.Add("Authorization", sasToken);

            if (headers != null)
            {
                request.Headers.Add(headers);
            }

            if (body != null)
            {
                byte[] bytes = Encoding.UTF8.GetBytes(body);

                try
                {
                    request.ContentLength = bytes.Length;
                    Stream requestStream = request.GetRequestStream();
                    requestStream.Write(bytes, 0, bytes.Length);
                    requestStream.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }

            try
            {
                response = (HttpWebResponse)await request.GetResponseAsync();
            }
            catch (WebException we)
            {
                if (we.Response != null)
                {
                    response = (HttpWebResponse)we.Response;
                }
                else
                    Console.WriteLine(we.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return response;
        }

        private static void DisplayResponseBody(HttpWebResponse response, string forcedType = null)
        {
            if (response == null)
                return;

            string contentType = response.ContentType;
            if (forcedType != null)
                contentType = forcedType;

            // Get the stream associated with the response.
            Stream receiveStream = response.GetResponseStream();

            // Pipes the stream to a higher level stream reader with the required encoding format. 
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);

            Console.WriteLine("");

            if (receiveStream == null)
                return;



            if (contentType.Contains("application/octet-stream"))
            {
                string xmlFiles = readStream.ReadToEnd();
                string[] sseps = { "<?xml " };
                string[] docs = xmlFiles.Split(sseps, StringSplitOptions.RemoveEmptyEntries);

                StringBuilder sb = null;
                XmlDocument xml = null;
                XmlWriterSettings settings = new XmlWriterSettings
                {
                    Indent = true,
                    IndentChars = "  ",
                    NewLineChars = "\r\n",
                    NewLineHandling = NewLineHandling.Replace
                };

                foreach (string doc in docs)
                {
                    xml = new XmlDocument();
                    xml.LoadXml(sseps[0] + doc);
                    sb = new StringBuilder();

                    using (XmlWriter writer = XmlWriter.Create(sb, settings))
                    {
                        xml.Save(writer);
                    }

                    Console.WriteLine(sb.ToString() + "\n");
                }
            }

            if (contentType.Contains("application/xml"))
            {
                XmlDocument xml = new XmlDocument();
                xml.LoadXml(readStream.ReadToEnd());

                StringBuilder sb = new StringBuilder();
                XmlWriterSettings settings = new XmlWriterSettings
                {
                    Indent = true,
                    IndentChars = "  ",
                    NewLineChars = "\r\n",
                    NewLineHandling = NewLineHandling.Replace
                };

                using (XmlWriter writer = XmlWriter.Create(sb, settings))
                {
                    xml.Save(writer);
                }

                Console.WriteLine(sb.ToString());
            }

            if (contentType.Contains("application/json"))
            {
                Console.WriteLine(JsonHelper.FormatJson(readStream.ReadToEnd()));
            }

            readStream.Close();
            receiveStream.Close();
        }

        class JsonHelper
        {
            private const string INDENT_STRING = "  ";
            public static string FormatJson(string str)
            {
                var indent = 0;
                var quoted = false;
                var sb = new StringBuilder();
                for (var i = 0; i < str.Length; i++)
                {
                    var ch = str[i];
                    switch (ch)
                    {
                        case '{':
                        case '[':
                            sb.Append(ch);
                            if (!quoted)
                            {
                                sb.AppendLine();
                                Enumerable.Range(0, ++indent).ForEach(item => sb.Append(INDENT_STRING));
                            }
                            break;
                        case '}':
                        case ']':
                            if (!quoted)
                            {
                                sb.AppendLine();
                                Enumerable.Range(0, --indent).ForEach(item => sb.Append(INDENT_STRING));
                            }
                            sb.Append(ch);
                            break;
                        case '"':
                            sb.Append(ch);
                            bool escaped = false;
                            var index = i;
                            while (index > 0 && str[--index] == '\\')
                                escaped = !escaped;
                            if (!escaped)
                                quoted = !quoted;
                            break;
                        case ',':
                            sb.Append(ch);
                            if (!quoted)
                            {
                                sb.AppendLine();
                                Enumerable.Range(0, indent).ForEach(item => sb.Append(INDENT_STRING));
                            }
                            break;
                        case ':':
                            sb.Append(ch);
                            if (!quoted)
                                sb.Append(" ");
                            break;
                        default:
                            sb.Append(ch);
                            break;
                    }
                }
                return sb.ToString();
            }
        }
    }

    static class Extensions
    {
        public static void ForEach<T>(this IEnumerable<T> ie, Action<T> action)
        {
            foreach (var i in ie)
            {
                action(i);
            }
        }
    }

}
