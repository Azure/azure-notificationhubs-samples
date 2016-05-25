# Send REST

## Requirements

The following APIs used in this example require a [standard tier notification hub](https://azure.microsoft.com/pricing/details/notification-hubs/):
- [Per Message Telemetry: Get Notification Message Telemetry](https://msdn.microsoft.com/library/azure/mt608135.aspx) 
- [PNS Feedback](https://msdn.microsoft.com/library/azure/mt705560.aspx)

## Overview


This Visual Studio 2015 project provides some example code for interacting with Azure Notification Hubs using the [Notification Hubs REST API](https://msdn.microsoft.com/en-us/library/azure/dn223264.aspx).

This code requires your notification hub name and the DefaultFullSharedAccessSignature in the [App.config](https://github.com/Azure/azure-notificationhubs-samples/blob/master/dotnet/SendRestExample/SendRestExample/App.config) file.

The following REST APIs are currently demonstrated in this example code:

- [Send a APNS Native Notification](https://msdn.microsoft.com/library/azure/dn223266.aspx)
- [Send a GCM Native Notification](https://msdn.microsoft.com/library/azure/dn223273.aspx)
- [Send a WNS Native Notification](https://msdn.microsoft.com/library/azure/dn223272.aspx)
- [Per Message Telemetry: Get Notification Message Telemetry](https://msdn.microsoft.com/library/azure/mt608135.aspx)
- [PNS Feedback](https://msdn.microsoft.com/library/azure/mt705560.aspx)
