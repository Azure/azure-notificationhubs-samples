# Notification Hubs Samples

This repository will contain sample code for Notification Hubs.

## Push to WNS sample
This sample is useful when you want to test the end to end flow between client app and WNS without Azure Notification Hubs in the picture. This helps in validating that your client app is set up correctly as well that you have the correct Package SID & Secret that you are configuring in the Azure Notification Hubs. In case the PNS responds with an error then you also get to see the exact error from the WNS itself providing additional information.

## Azure Notification Hubs - Push to Windows Phone Silverlight application
Azure Notification Hubs Windows Phone SDK currently does not support using WNS with Windows Phone 8.1 Silverlight apps. This sample takes you through the steps to create a Windows Phone 8.1 Silverlight app which registers with Azure Notification Hubs (ANH) so that it can receive notifications via ANH. 

## Notification Hubs REST wrapper for Java

**The official Java SDK is now available at - [Official Java SDK]. Please refer to it going forward.**

This is a fully working sample of a server SDK for Notification Hubs in Java. It contains REST wrappers for all operations including seding notifications and registration management.

It also contains an implementation of partitioning logic in case you have to use multiple Notification Hubs for very high scale apps (>10M users).

You can find a detailed readme in the `notificationhubs-rest-java` directory.

## Notification Hubs REST wrapper for PHP
This is a sample for sending notifications to Notification Hubs using PHP.

You can find a detailed readme in the `notificationhubs-rest-PHP` directory.

## Notification Hubs REST wrapper for Python
This is a sample for sending notifications to Notification Hubs using Python.

Detailed readme is available here - 
http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-python-backend-how-to/

[Official Java SDK]: https://github.com/Azure/azure-notificationhubs-java-backen
