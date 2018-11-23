package com.example.microsoft.getstartednh;

/**
 * Created by Wesley on 7/1/2016.
 */
import android.content.Intent;
import android.util.Log;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;


public class MyInstanceIDService extends FirebaseInstanceIdService {

    private static final String TAG = "MyInstanceIDService";

    @Override
    public void onTokenRefresh() {

	    Log.d(TAG, "Refreshing FCM registration token");

        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "Refreshed FCM registration token: " + refreshedToken);

        //TODO:sendRegistrationToServer(refreshedToken);
        //sendRegistrationToServer(refreshedToken);
    }
};
