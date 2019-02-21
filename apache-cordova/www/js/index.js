const warningMessage = "You must populate the project's config.js file with your account's Azure Notification Hubs settings before launching the app.";

var app = {

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    
    onDeviceReady: function () {

        // validate that the config values aren't empty before attempting to register for push
        if (config.hubName && config.hubConnectionString) {

            var push = PushNotification.init({
                notificationHubPath: config.hubName,
                connectionString: config.hubConnectionString,

                android: {
                    sound: true
                },
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                }
            });

            push.on('registration', function (data) {
                console.log('Registration');                
                console.log(`Registration ID: ${data.registrationId}`);
                console.log(`Azure Reg ID: ${data.azureRegId}`);
                // Update the contents of the page with the registration IDs
                document.getElementById("regID").innerHTML = `<strong>Registration ID:</strong><br />${data.registrationId}`;
                document.getElementById("azureID").innerHTML = `<strong>Azure Registration ID:</strong><br />${data.azureRegId}`;
                // alert the user
                alert(JSON.stringify(data));
            });

            push.on('notification', function (data) {
                console.log('Notification');
                console.dir(data);                
                alert(JSON.stringify(data));
            });

        } else {
            // the config file's not populated, so display a warning (and don't attempt to register)            
            document.getElementById("regID").innerHTML = `<strong>Warning:</strong> ${warningMessage}`;
            alert(warningMessage);
        }

    }

};

app.initialize();