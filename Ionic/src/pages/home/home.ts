import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';

// Event pages
import { RegistrationEventPage } from '../registration-event/registration-event';
import { NotificationEventPage } from '..//notification-event/notification-event';

// Interfaces and Providers
import { EventType, Registration, Notification } from '../../interfaces/events';
import { AzureNotificationHubsProvider } from '../../providers/azure-notification-hubs/azure-notification-hubs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private eventList: (Registration | Notification)[] = []

  constructor(
    public events: Events,
    public pushService: AzureNotificationHubsProvider,
    public nav: NavController
  ) {
    console.log('HomePage constructor');

    // The provider (AzureNotificationHubs) fires an event whenever it
    // gets new data
    this.events.subscribe("anh: data-change", () => {
      // Update our local copy of the event data when it changes in the provider
      console.log("HomePage: event data change detected");
      this.eventList = this.pushService.pushEvents;
    });

  }

  viewEvent(theEvent: Registration | Notification) {
    console.log('HomePage: event tapped')
    // What type of event do we have?
    if (theEvent.type == EventType.registration) {
      console.log('HomePage: Opening Registration Event')
      this.nav.push(RegistrationEventPage, { event: <Registration>theEvent });
    } else {
      console.log('HomePage: Opening Notification Event')
      this.nav.push(NotificationEventPage, { event: <Notification>theEvent });
    }
  }

}
