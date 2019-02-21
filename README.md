# Notification Hubs Samples

This repository contains sample code for Azure Notification Hubs. The links provided in this file point to tutorials in the Azure Notification Hubs documentation.

## Client Applications

Samples illustrating how to use Azure Notification Hubs in a client application.

### [Android]

1. [Getting started with Notification Hubs for Android Apps](https://azure.microsoft.com/documentation/articles/notification-hubs-android-get-started/)

### [Apache Cordova]

A simple example of how to use Azure Notification Hubs with an Apache Cordova application. The app uses the [cordova-azure-notification-hubs](https://github.com/derek82511/cordova-azure-notification-hubs) plugin.

### [DotNet]

1. [Getting started with Notification Hubs for Windows Store Apps](https://azure.microsoft.com/documentation/articles/notification-hubs-windows-store-dotnet-get-started/)

### [Ionic]

A simple example of how to use Azure Notification Hubs with an Ionic 3 application. The app uses the [cordova-azure-notification-hubs](https://github.com/derek82511/cordova-azure-notification-hubs) plugin.

### [iOS]

1. [Getting started with Notification Hubs for iOS Apps](https://azure.microsoft.com/documentation/articles/notification-hubs-ios-get-started/).

2. SharePointListPushToSwift has a Swift client app using Notification Hubs' iOS SDK with Obj-C/Swift bridging, and includes a .NET console backend that can be run locally to send push notifications to the client based on additions to an authentication required sharepoint list.

### [Silverlight Phone]

Azure Notification Hubs Windows Phone SDK currently does not support using WNS with Windows Phone 8.1 Silverlight apps. This sample takes you through the steps to create a Windows Phone 8.1 Silverlight app which registers with Azure Notification Hubs so that it can receive notifications via Notification Hubs.

## Push Apps

Samples illustrating how to send notifications to apps using Azure Notification Hubs.

### [Chrome Apps]

Sample Chrome App to demonstrate how to use Azure Notification Hubs to push to Chrome Apps. 

### [Safari]

Sample on how to send push notifications to Safari using Azure Notification Hubs and Azure Web Sites. 

### [WNS]

This sample is useful when you want to test the end to end flow between client app and WNS without Azure Notification Hubs in the picture. This helps in validating that your client app is set up correctly as well that you have the correct Package SID & Secret that you are configuring in the Azure Notification Hubs. In case the PNS responds with an error then you also get to see the exact error from the WNS itself providing additional information.

## [Enterprise Push]

http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-enterprise-push-architecture/

## [Programmatic Telemetry access]

This sample is in the form of a console application which is configured to call to HDInsights and print out metrics for a given Notification Hub and filter.

## SDK

### [PHP SDK]

This is a sample for sending notifications to Notification Hubs using PHP.

### [Python SDK]

This is a sample for sending notifications to Notification Hubs using Python.

### [Java SDK]

**The official Java SDK is now available at - [Official Java SDK]. Please refer to it going forward. This is here only for legacy reasons.**

<!-- Sample Apps -->
[Android]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/Android
[Apache Cordova]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/apache-cordova
[DotNet]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/dotnet
[Ionic]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/ionic
[iOS]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/iOS
[Silverlight Phone]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/PushToSLPhoneApp

<!-- Push Apps -->
[Chrome Apps]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/PushToChromeApps
[Chrome Apps tutorial]: http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-chrome-get-started/
[Safari]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/PushToSafari
[WNS]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/PushToWNSDirectly

[Enterprise Push]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/EnteprisePush
[Programmatic Telemetry access]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/NHTelemetry

<!-- SDK -->
[Official Java SDK]: https://github.com/Azure/azure-notificationhubs-java-backend
[Java SDK]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/notificationhubs-rest-java
[PHP SDK]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/notificationhubs-rest-php
[Python SDK]: https://github.com/Azure/azure-notificationhubs-samples/tree/master/notificationhubs-rest-python
