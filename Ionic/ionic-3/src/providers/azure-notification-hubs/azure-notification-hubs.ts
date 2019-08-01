import { AlertController, Events, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

// use lodash to clone data objects coming from the push service
import * as _ from 'lodash';

// Interface(s)
import { Registration, Notification, EventType } from '../../interfaces/events';
// Azure Notification Hubs configuration (in an external file)
import { config } from '../../app/config';

declare let PushNotification;

@Injectable()
export class AzureNotificationHubsProvider {

  // make an empty array of registrations and notifications
  public pushEvents: (Registration | Notification)[] = [];

  constructor(
    private alertCtrl: AlertController,
    private events: Events,
    private platform: Platform
  ) {
    // Wait until the container's initialized before doing anything here
    this.platform.ready().then(() => {
      console.log('AzureNotificationHubsProvider: Platform ready');

      // make sure the config values are set in the config.ts file.
      if (config.hubName && config.hubConnectionString) {
        // Initialize the Push Service
        var push = PushNotification.init({
          // Pass in our configuration values
          notificationHubPath: config.hubName,
          connectionString: config.hubConnectionString,

          android: { sound: true },
          ios: {
            alert: 'true', badge: true, sound: 'false'
          }
        });

        push.on('registration', data => {
          console.log('Received Registration event');
          // Copy the event data into a Registration object
          let registration: Registration = _.clone(data);
          // Populate the object type
          registration.type = EventType.registration;
          // Set the title (registrations won't have one)
          registration.title = 'Registration';
          // Set the created date
          registration.received = new Date(Date.now());
          // Add the event to the events array        
          this.saveData(registration);
          this.events.publish("anh: data-change");

          // Tell the user
          let alert = this.alertCtrl.create({
            title: registration.title,
            message: "Registration completed successfully",
            buttons: ['OK']
          });
          alert.present();
        });

        push.on('notification', data => {
          console.log('Received Notification event');
          // Copy the event data into a Notification object
          let notification: Notification = _.clone(data);
          // Populate the object type
          notification.type = EventType.notification;
          // Set the created date
          notification.received = new Date(Date.now());
          // Add the event to the events array 
          this.saveData(notification);
          this.events.publish("anh: data-change");
        
          // Tell the user
          let alert = this.alertCtrl.create({
            title: notification.title,
            message: notification.message,
            buttons: ['OK']
          });
          alert.present();
        });

      } else {
        // Tell the user this won't work until they `fix` the config.
        let alert = this.alertCtrl.create({
          title: 'Invalid Configuration',
          message: "Please populate the project's <strong>src/app/config.ts</strong> file with settings from your Azure Notification Hubs configuration.",
          buttons: ["OK, I'm sorry!"]
        });
        alert.present();
      }

    });
  }

  saveData(data: Registration | Notification) {
    console.log('Saving data to the pushEvents array');
    this.pushEvents.push(data);
    console.dir(this.pushEvents);
  }

}
