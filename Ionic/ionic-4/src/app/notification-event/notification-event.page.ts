import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { EventType, Registration, Notification } from '../interfaces/events';
import { AzureNotificationHubsService } from '../services/azure-notification-hubs.service';

@Component({
  selector: 'app-notification-event',
  templateUrl: './notification-event.page.html',
  styleUrls: ['./notification-event.page.scss'],
})
export class NotificationEventPage implements OnInit {

  private event: Notification = {
    // initialize as empty object just to start, otherwise
    // the .html page will crash on load.
    type: EventType.notification,
    title: '',
    subtitle: '',
    body: '',
    id: '',
    badge: 0,
    notification: '',
    data: {},
    click_action: '',
    link: '',
    received: new Date(Date.now())
  };

  constructor(
    public navCtrl: NavController,
    public pushService: AzureNotificationHubsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('NotificationEventPage: ngOnInit()');
    // Get the index from the Query String
    const idx = parseInt(this.route.snapshot.paramMap.get('idx'), 10);
    // Grab that item from the event list
    this.event = this.pushService.pushEvents[idx] as Notification;
  }

}
