namespace NHTelemetry
{
    using Microsoft.Azure.Insights;
    using Microsoft.Azure.Insights.Models;
    using Microsoft.IdentityModel.Clients.ActiveDirectory;
    using Microsoft.Rest;
    using System;
    using System.Configuration;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    class Program
    {
        private static string _tenantId = "";
        private static string _applicationId = "";
        private static string _applicationKey = "";
        private static string _subscriptionId = "";
        private static string _resourceGroup = "";
        private static string _namespace = "";
        private static string _hub = "";
        private static string _filter = "";

        private const string adResource = "https://management.core.windows.net/";
        private const string adAuthority = "https://login.windows.net/";

        static void Main(string[] args)
        {
            _tenantId = ConfigurationManager.AppSettings["AzureADTenantId"];
            _applicationId = ConfigurationManager.AppSettings["AzureADApplicationId"];
            _applicationKey = ConfigurationManager.AppSettings["AzureADApplicationKey"];
            _subscriptionId = ConfigurationManager.AppSettings["SubscriptionId"];
            _resourceGroup = ConfigurationManager.AppSettings["ResourceGroupName"];
            _namespace = ConfigurationManager.AppSettings["NotificationHubNamespace"];
            _hub = ConfigurationManager.AppSettings["NotificationHubName"];
            _filter = ConfigurationManager.AppSettings["filter"];

            var nhUri = $"/subscriptions/{_subscriptionId}/resourceGroups/{_resourceGroup}/providers/Microsoft.NotificationHubs/namespaces/{_namespace}/NotificationHubs/{_hub}";
            var authToken = GetAuthToken().GetAwaiter().GetResult();
            var creds = new TokenCredentials(authToken);

            // Fetch metric definitions 
            var metricDefinitions = GetMetricDefinitions(creds, nhUri);
            PrintMetricDefinition(metricDefinitions);

            // Fetch metric values
            var metricsWithFilter = GetMetrics(creds, nhUri, _filter);
            PrintMetricValues(metricsWithFilter);

            Console.ReadLine();
        }

        static async Task<string> GetAuthToken()
        {
            AuthenticationResult authResult = null;
            AuthenticationContext authContext = new AuthenticationContext($"{adAuthority}{_tenantId}/");
            var clientCreds = new ClientCredential(_applicationId, _applicationKey);
            authResult = await authContext.AcquireTokenAsync(adResource, clientCreds).ConfigureAwait(false);
            return authResult.AccessToken;
        }

        static IEnumerable<MetricDefinition> GetMetricDefinitions(TokenCredentials credentials, string resourceUri)
        {
            using (var client = new InsightsClient(credentials))
            {
                return client.MetricDefinitions.List(resourceUri).ToList();
            }
        }

        static IEnumerable<Metric> GetMetrics(TokenCredentials credentials, string resourceUri, string filter)
        {
            using (var client = new InsightsClient(credentials))
            {
                return client.Metrics.List(resourceUri, filter).ToList();
            }
        }

        static void PrintMetricDefinition(IEnumerable<MetricDefinition> metricDefinitions)
        {
            foreach (var metricDefinition in metricDefinitions)
            {
                Console.WriteLine($"Metric: {metricDefinition.Name.Value}");

                Console.WriteLine($"\tTime Grains");
                foreach (var metricAvailability in metricDefinition.MetricAvailabilities)
                {
                    Console.WriteLine($"\t{metricAvailability.TimeGrain}");
                }

                Console.WriteLine();
            }
        }

        private static void PrintMetricValues(IEnumerable<Metric> metrics)
        {
            foreach (Metric metric in metrics)
            {
                Console.WriteLine($"Metric: {metric.Name.Value}");
                foreach (MetricValue metricValue in metric.Data)
                {
                    Console.WriteLine($"{metricValue.TimeStamp} - {metricValue.Total}");
                }

                Console.WriteLine();
            }
        }
    }
}