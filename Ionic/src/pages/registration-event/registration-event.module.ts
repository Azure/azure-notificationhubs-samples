import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationEventPage } from './registration-event';

@NgModule({
  declarations: [
    RegistrationEventPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationEventPage),
  ],
})
export class RegistrationEventPageModule {}
