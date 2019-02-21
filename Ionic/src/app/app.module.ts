import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// Pages 
import { HomePage } from '../pages/home/home';
import { NotificationEventPage} from '../pages/notification-event/notification-event'
import { RegistrationEventPage} from '../pages/registration-event/registration-event';

// Providers 
import { AzureNotificationHubsProvider } from '../providers/azure-notification-hubs/azure-notification-hubs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NotificationEventPage,
    RegistrationEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NotificationEventPage,
    RegistrationEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AzureNotificationHubsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
