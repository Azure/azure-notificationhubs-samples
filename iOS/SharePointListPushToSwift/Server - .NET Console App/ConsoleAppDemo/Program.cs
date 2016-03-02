using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.NotificationHubs;
using System.Threading;

namespace ConsoleAppDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            DateTime lastRefreshDate = DateTime.Now;

            while(true)
            {
                DateTime newRefreshDate = DateTime.Now;

                ClientContext context = new ClientContext("{sharepoint site url, e.g. https://microsoft.sharepoint.com/xyz}");

                // auth
                SecureString password = new SecureString();
                foreach (char c in "{sharepoint password}".ToCharArray()) password.AppendChar(c);
                var spCredentials = new SharePointOnlineCredentials("sharepoint username", password);
                context.Credentials = spCredentials;

                List docs = context.Web.Lists.GetByTitle("C&E News");
                context.Load(docs);
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = "<View Scope='RecursiveAll'></View>";
                ListItemCollection listItems = docs.GetItems(camlQuery);

                context.Load(listItems,
                     items => items.Include(
                        item => item.FieldValuesAsText,
                        item => item["fodb"],
                        item => item["Category"],
                        item => item["iisx"],
                        item => item["Title"],
                        item => item["Created"],
                        item => item.DisplayName
                        ));
                context.ExecuteQuery();

                foreach (ListItem listItem in listItems)
                {
                    Console.WriteLine("Headline: {0}", listItem["Title"]);
                    Console.WriteLine("Details: {0}", listItem.FieldValuesAsText.FieldValues["fodb"]);
                    Console.WriteLine("Category: {0}", listItem.FieldValuesAsText.FieldValues["Category"]);
                    Console.WriteLine("Author: {0}", listItem.FieldValuesAsText.FieldValues["iisx"]);

                    // if datetime created is after stored datetime, send notification
                    DateTime itemDate = Convert.ToDateTime(listItem["Created"]).ToLocalTime();
                    Console.WriteLine("Item time: {0}", itemDate);
                    Console.WriteLine("Last Refresh Time: {0}", lastRefreshDate);
                    Console.WriteLine("----------------");

                    if (DateTime.Compare(itemDate, lastRefreshDate) > 0)
                    {
                        var message = listItem["Title"] + " By " + listItem.FieldValuesAsText.FieldValues["iisx"];
                        SendNotificationAsync(message, new[] { listItem.FieldValuesAsText.FieldValues["Category"] });
                        Console.WriteLine("*****Sending notification......");
                    }
                }

                lastRefreshDate = newRefreshDate;
                Console.WriteLine("Sharepoint pull complete");
                Thread.Sleep(10000);
                Console.Clear();
            }
        }

        private static async void SendNotificationAsync(string message, string[] tags)
        {
            NotificationHubClient hub = NotificationHubClient.CreateClientFromConnectionString("{notification hub full connection string}", "{notification hub name}");
            var alert = "{\"aps\":{\"alert\":\"" + message + "\",\"sound\":\"default\"}}";
            await hub.SendAppleNativeNotificationAsync(alert, tags);
        }
    }
}
