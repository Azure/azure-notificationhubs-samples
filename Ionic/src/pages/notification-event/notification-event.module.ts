import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationEventPage } from './notification-event';

@NgModule({
  declarations: [
    NotificationEventPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationEventPage),
  ],
})
export class NotificationEventPageModule {}
