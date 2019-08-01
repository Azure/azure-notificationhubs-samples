import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventType, Registration } from '../../interfaces/events';

@IonicPage()
@Component({
  selector: 'page-registration-event',
  templateUrl: 'registration-event.html',
})
export class RegistrationEventPage {

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
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationEventPage');
    // Pull the event we received from the home page    
    this.event = this.navParams.get("event");
  }

}
