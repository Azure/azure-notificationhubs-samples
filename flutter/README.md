# Azure Notification Hubs Flutter Sample

This project bridges the Azure Notification Hubs SDKs for both Apple and Android and makes it available to Flutter.

## Getting Started

To get started with Flutter, check out the following documentation.

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)
- [Writing custom platform-specific code](https://flutter.dev/docs/development/platform-integration/platform-channels)

This sample uses the `MethodChannel` for Flutter to communicate with the client SDK methods using the `azure.microsoft.com/nhub` channel.  This sample also uses the Flutter`EventChannel` with the channel of `azure.microsoft.com/nhubevents`.

```dart
static const eventChannel = const EventChannel('azure.microsoft.com/nhubevents');
static const methodChannel = const MethodChannel('azure.microsoft.com/nhub');
```

Then you can communicate with the client SDK to add tags such as calling the `addTag` method.

```dart
  Future<void> _addTag() async {
    String tag = 'tag' + (_increment++).toString();
    // Await the addTag method
    bool result = await methodChannel.invokeMethod('addTag', tag);
    if (result) {
      setState(() {
        _tags.add(tag);
      });
    }
  }
```

Events for receiving messages from Azure Notification Hubs is done through the `EventChannel`, calling listen to get messages from the server.

```dart
  @override
  void initState() {
    super.initState();
    // Listen for events
    eventChannel.receiveBroadcastStream().listen(_onEvent);
  }

  // Handle the events
  void _onEvent(Object event) {
    setState(() {
      _message = event.toString();
    });
  }
```

### Android Setup

To make the sample work on Android, you need to provide both the hub name and connection string from the listen access policy for your Azure Notification Hub.  This can either be stored in an environment variable of `APP_HUB_NAME` and `APP_NH_CONNECTION_STRING` or in a `secrets.properties` file.  An example is in the Android app `build.gradle`.

```gradle
// This is not a complete build.gradle file, it only highlights the portions you'll need to use ANH.

android {
    defaultConfig {
        // Populates BuildConfig.hubName with the value that was stored APP_HUB_NAME at build time.
        buildConfigField("String", "hubName", "\"${System.getenv('APP_HUB_NAME') ?: secretsProperties['APP_HUB_NAME']}\"")
        //Populates BuildConfig.hubListenConnectionString with the value that was stored in APP_NH_CONNECTION_STRING at build time.
        buildConfigField("String", "hubListenConnectionString", "\"${System.getenv('APP_NH_CONNECTION_STRING') ?: secretsProperties['APP_NH_CONNECTION_STRING']}\"")
    }
}
```

### iOS Setup

To make the sample work on Android, you need to provide both the hub name and connection string from the listen access policy for your Azure Notification Hub.  In order to run the sample, modify the `DevSettings.plist` file, filling in the `CONNECTION_STRING` with the listen connection string from your access policy and the `HUB_NAME` with the Azure Notification Hub name.
