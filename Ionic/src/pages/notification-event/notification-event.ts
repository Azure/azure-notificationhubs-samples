import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventType, Notification } from '../../interfaces/events';

@IonicPage()
@Component({
  selector: 'page-notification-event',
  templateUrl: 'notification-event.html',
})
export class NotificationEventPage {

  private event: Notification = {
    // initialize as empty object just to start, otherwise 
    // the .html page will crash on load. 
    type: EventType.notification,
    title: '',
    message: '',
    count: 0,
    sound: '',
    image: '',
    additionalData: [],
    received: new Date(Date.now())
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationEventPage');
    // Pull the event we received from the home page    
    this.event = this.navParams.get("event");
  }

}
