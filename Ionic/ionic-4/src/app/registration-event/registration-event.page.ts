import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { EventType, Registration } from '../interfaces/events';
import { AzureNotificationHubsService } from '../services/azure-notification-hubs.service';

@Component({
  selector: 'app-registration-event',
  templateUrl: './registration-event.page.html',
  styleUrls: ['./registration-event.page.scss'],
})
export class RegistrationEventPage implements OnInit {

  private event: Registration = {
    // initialize as empty object just to start, otherwise
    // the .html page will crash on load.
    type: EventType.registration,
    title: '',
    registrationId: '',
    azureRegId: '',
    received: new Date(Date.now())
  };

  constructor(
    public navCtrl: NavController,
    // public navParams: NavParams,
    public pushService: AzureNotificationHubsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('NotificationEventPage: ngOnInit()');
    // Get the index from the Query String
    const idx = parseInt(this.route.snapshot.paramMap.get('idx'), 10);
    // Grab that item from the event list
    this.event = this.pushService.pushEvents[idx] as Registration;
  }

}
