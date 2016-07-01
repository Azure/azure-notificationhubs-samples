package com.example.microsoft.getstartednh;

/**
 * Created by Wesley on 7/1/2016.
 */
import android.content.Intent;
import android.util.Log;
import com.google.firebase.iid.FirebaseInstanceIdService;


public class MyInstanceIDService extends FirebaseInstanceIdService {

    private static final String TAG = "MyInstanceIDService";

    @Override
    public void onTokenRefresh() {

        Log.d(TAG, "Refreshing GCM Registration Token");

        Intent intent = new Intent(this, RegistrationIntentService.class);
        startService(intent);
    }
};
