using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Security.Cryptography.X509Certificates;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace NHTelemetrySpreadsheet
{
    [DataContract(Name = "properties", Namespace = "http://schemas.microsoft.com/ado/2007/08/dataservices")]
    class MetricValue
    {
        [DataMember(Name = "Timestamp")]
        public DateTime Timestamp { get; set; }

        [DataMember(Name = "Min")]
        public long Min { get; set; }

        [DataMember(Name = "Max")]
        public long Max { get; set; }

        [DataMember(Name = "Total")]
        public long Total { get; set; }

        [DataMember(Name = "Average")]
        public float Average { get; set; }
    }

    public enum TelemetryRollups
    {
        PT5M,
        PT1H,
        P1D
    }

    public class TelemetryInputs
    {
        public string SubscriptionId { get; set; }
        public string NamespaceName { get; set; }
        public string NotificationHubName { get; set; }
        public string MetricName { get; set; }
        public TelemetryRollups Rollup { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string PathToCert { get; set; }
        public string CertPassword { get; set; }

    }
    public class Telemetry
    {
        public DateTime TimeStamp {get; set;}
        public long Value {get;set;}
        public Telemetry(DateTime timestamp, long value)
        {
            this.TimeStamp = timestamp;
            this.Value = value; 
        }
    }

    class NHTelemetry
    {
        public static List<Telemetry> GetTelemetryData(TelemetryInputs inputs)
        {
            string uri = @"https://management.core.windows.net/{subscriptionId}/services/ServiceBus/namespaces/{namespaceName}/NotificationHubs/{hubName}/metrics/{metricName}/rollups/{metricRollup}/Values?$filter={filterExpression}";

            uri = uri.Replace("{subscriptionId}", inputs.SubscriptionId);
            uri = uri.Replace("{namespaceName}", inputs.NamespaceName);
            uri = uri.Replace("{hubName}", inputs.NotificationHubName);
            uri = uri.Replace("{metricName}", inputs.MetricName);
            uri = uri.Replace("{metricRollup}", inputs.Rollup.ToString());

            string strFromDate = String.Format("{0:s}", inputs.FromDate);
            string strToDate = String.Format("{0:s}", inputs.ToDate);

            // See - http://msdn.microsoft.com/library/azure/dn163590.aspx for details
            string filterExpression = String.Format
                ("Timestamp%20gt%20datetime'{0}Z'%20and%20Timestamp%20lt%20datetime'{1}Z'", 
                    strFromDate, strToDate);
            uri = uri.Replace("{filterExpression}", filterExpression);

            X509Certificate2 certificate = new X509Certificate2(inputs.PathToCert, inputs.CertPassword);

            HttpWebRequest sendNotificationRequest = (HttpWebRequest)WebRequest.Create(uri);
            sendNotificationRequest.Method = "GET";
            sendNotificationRequest.ContentType = "application/xml";
            sendNotificationRequest.Headers.Add("x-ms-version", "2011-02-25");
            sendNotificationRequest.ClientCertificates.Add(certificate);

            List<Telemetry> data = new List<Telemetry>(); 
            try
            {
                HttpWebResponse response = (HttpWebResponse)sendNotificationRequest.GetResponse();

                using (XmlReader reader = XmlReader.Create(response.GetResponseStream(),
                    new XmlReaderSettings { CloseInput = true }))
                {
                    SyndicationFeed feed = SyndicationFeed.Load<SyndicationFeed>(reader);
                    
                    foreach (SyndicationItem item in feed.Items)
                    {
                        XmlSyndicationContent syndicationContent = item.Content as XmlSyndicationContent;
                        MetricValue value = syndicationContent.ReadContent<MetricValue>();
                        data.Add(new Telemetry(value.Timestamp, value.Total));
                        Console.WriteLine("Timestamp: {0} -> Total: {1}", value.Timestamp, value.Total);
                    }
                }
            }
            catch (WebException exception)
            {
                string error = new StreamReader(exception.Response.GetResponseStream()).ReadToEnd();
                Console.WriteLine(error);
            }
            return data;
        }
    }
}
