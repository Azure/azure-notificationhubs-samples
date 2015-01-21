# Fetch Notification Hubs Telemetry Programmatically 

Azure Notification Hubs telemetry which is available on Azure management portal on the **Dashboard** and **Monitoring** tab is also available for access via REST APIs in case you want to build a customized dashboard or if you want to view or analyze the data in Excel. This is also useful because you don't have to give access to the entire management portal for someone who only wants to look at the metrics data. 

This sample is in the form of a VSTO Excel application which uses the Notification Hubs REST API to get the telemetry data and then uses the Excel functions to populate a spreadsheet with the data as well as generate a chart of the retrieved data. 

###Configuration###
Set up the certificate which will allow you to access the management API which returns the metrics. You can do this by following the **Step 1** & **Step 2** described at [NH Metrics - Programmatic Access]. At the end of this you should have a **.cer** file uploaded to the Azure Management portal and a **.pfx** available on your hard drive. 

###Running the sample###
1. Open up the **NHTelemetrySpreadsheet** solution in Visual Studio and run. 
2. You will see an Excel interface requiring you to fill the information required to fetch the telemetry data. 
	![][2]
3. You can select the MetricRollup as *Rollup By 1 Day*, *Rollup By 1 Hour* or *Rollup By 5 Minutes*. These are the three rollups available. 
4. You can select the MetricName as any of the selections available in the sample. This sample only exposes a small set of telemetries but you can extend this to expose the full set as described here - [NH All available metrics].
5. Click **Get Metrics Data**. 
6. This will fetch all the telemetry data from Azure and display it on 'TelemetryData' tab depending on the selected metrics. 

	![][3]

8. This will also generate a chart using the generated data as the underlying source. 

	![][4]

	You can compare this with the portal chart and verify that they are similar (when the portal telemetry is viewed with 'Absolute' data sizing)

	![][1]

###Code###
1. This code is an adaption of code described at [NH Metrics - Programmatic Access].
2. The main component is `NHTelemetry` where we retrieve the metrics based on the user inputs. 

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

3. The rest of the code in the solution is VSTO Excel specific about how to copy this data into the spreadsheet and generate the charting element for it. 

<!-- Links -->
[NH Metrics - Programmatic Access]: https://msdn.microsoft.com/en-us/library/dn458823.aspx
[NH All available metrics]: https://msdn.microsoft.com/en-us/library/dn458822.aspx

<!-- Images -->
[1]: ./media/PortalTelemetry.png
[2]: ./media/ExcelInput.png
[3]: ./media/TelemetryData.png
[4]: ./media/TelemetryChart.png
