import { Component } from '@angular/core';
import { Events, NavController } from '@ionic/angular';

// Interfaces and Providers
import { EventType, Registration, Notification } from '../interfaces/events';
import { AzureNotificationHubsService } from '../services/azure-notification-hubs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private eventList: (Registration | Notification)[] = [];

  constructor(
    public events: Events,
    public pushService: AzureNotificationHubsService,
    public nav: NavController
  ) {
    console.log('HomePage constructor');

    // The provider (AzureNotificationHubs) fires an event whenever it
    // gets new data
    this.events.subscribe('anh: data-change', () => {
      // Update our local copy of the event data when it changes in the provider
      console.log('HomePage: event data change detected');
      // Get the current event list from the service
      this.eventList = this.pushService.pushEvents;
    });
  }

  viewEvent(theEvent: Registration | Notification, idx: number) {
    console.log(`HomePage: viewEvent(${idx})`);
    console.dir(theEvent);
    // What type of event do we have?
    if (theEvent.type === EventType.registration) {
      console.log('HomePage: Opening Registration Event');
      this.nav.navigateForward(`/registration/${idx}`);
    } else {
      console.log('HomePage: Opening Notification Event');
      this.nav.navigateForward(`/notification/${idx}`);
    }
  }

}
