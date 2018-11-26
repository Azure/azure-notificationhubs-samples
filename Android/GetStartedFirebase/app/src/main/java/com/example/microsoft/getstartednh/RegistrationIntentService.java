package com.example.microsoft.getstartednh;

/**
 * Created by Wesley on 7/1/2016.
 */
import android.app.IntentService;
import android.content.Intent;
import android.util.Log;

import com.microsoft.windowsazure.messaging.NotificationHub;

public class RegistrationIntentService extends IntentService {

    private static final String TAG = "RegIntentService";
    protected static String FCM_token = "";

    public RegistrationIntentService() {
        super(TAG);
    }

    @Override
    protected void onHandleIntent(Intent intent) {

        String resultString = null;

        try {

            NotificationHub hub = new NotificationHub(NotificationSettings.HubName,
                    NotificationSettings.HubListenConnectionString, this);

            Log.d(TAG, "NH Registration refreshing with token : " + FCM_token);
            String regID = hub.register(FCM_token).getRegistrationId();

            // If you want to use tags...
            // Refer to : https://azure.microsoft.com/en-us/documentation/articles/notification-hubs-routing-tag-expressions/
            // regID = hub.register(token, "tag1,tag2").getRegistrationId();

            resultString = "New NH Registration Successfully - RegId : " + regID;
            Log.d(TAG, resultString);
        } catch (Exception e) {
            Log.e(TAG, resultString = "Failed to complete registration", e);
            // If an exception happens while fetching the new token or updating our registration data
            // on a third-party server, this ensures that we'll attempt the update at a later time.
        }

        // Notify UI that registration has completed.
        if (MainActivity.isVisible) {
            MainActivity.mainActivity.ToastNotify(resultString);
        }

    }

}
