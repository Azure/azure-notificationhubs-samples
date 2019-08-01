# Azure Notification Hubs Ionic Samples

Many of our customers use the [Ionic Framework](https://ionicframework.com/) for their mobile apps as a way to deliver cross-platform mobile apps to their customers and employees. While Azure Notification Hubs doesn’t directly support Ionic, Ionic supports most [Apache Cordova](https://cordova.apache.org/) plugins and there’s a [community-built plugin](https://github.com/derek82511/cordova-azure-notification-hubs) for Azure Notification Hubs apps running on Apache Cordova.

This section of the repository contains sample apps for Ionic 3 and Ionic 4.

The Apache Cordova-based Ionic 3 sample uses the [cordova-azure-notification-hubs](https://github.com/derek82511/cordova-azure-notification-hubs) plugin directly to manage registering for notifications and processing notifications when they arrive on the device.

With Ionic 4, the Ionic team added support for [Capacitor](https://capacitor.ionicframework.com/) their Cordova replacement. Capacitor includes its own Push plugin, so this sample uses the cordova-azure-notification-hubs plugin (Capacitor is compatible with many Cordova plugins) as well as the built-in Capacitor Push plugin. This means that the Ionic 4 sample is a little different than the Ionic 3 version, so please pay special attention to which approach you're using.
