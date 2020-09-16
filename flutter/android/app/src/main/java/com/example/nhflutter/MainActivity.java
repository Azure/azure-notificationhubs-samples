package com.example.nhflutter;

import androidx.annotation.NonNull;

import com.microsoft.windowsazure.messaging.notificationhubs.NotificationHub;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.EventChannel;
import io.flutter.plugin.common.EventChannel.StreamHandler;

public class MainActivity extends FlutterActivity {
    private static final String METHOD_CHANNEL = "azure.microsoft.com/nhub";
    private static final String EVENT_CHANNEL = "azure.microsoft.com/nhubevents";

    private MethodChannel nhubMethodChannel;
    private EventChannel nhubEventChannel;
    private EventChannel.EventSink nhubEventSink;

    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);

        nhubEventChannel = new EventChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), EVENT_CHANNEL);
        nhubEventChannel.setStreamHandler(new StreamHandler() {

            @Override
            public void onListen(Object arguments, EventChannel.EventSink events) {
                nhubEventSink = events;
            }

            @Override
            public void onCancel(Object arguments) {
                nhubEventSink = null;
            }
        });

        // Initialize NotificationHub
        NotificationHub.setListener((context, notificationMessage) -> {
            if (nhubEventSink != null) {
                nhubEventSink.success(notificationMessage.getData());
            }
        });

        NotificationHub.start(this.getApplication(), BuildConfig.hubName, BuildConfig.hubListenConnectionString);

        nhubMethodChannel = new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), METHOD_CHANNEL);
        nhubMethodChannel.setMethodCallHandler((call, result) -> {
            if (call.method.equals("addTag")) {
                String tag = call.arguments();
                boolean addTagResult = NotificationHub.addTag(tag);
                result.success(addTagResult);
            } if (call.method.equals("clearTags")) {
                NotificationHub.clearTags();
                result.success(null);
            } else {
                result.notImplemented();
            }
        });
    }
}
