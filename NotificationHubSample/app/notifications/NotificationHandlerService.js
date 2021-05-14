import PushNotification from 'react-native-push-notification';
import PushNotificationHandler from './NotificationHandler';

export default class PushNotificationService {
    constructor(onTokenReceived, onNotificationReceived) {
        PushNotificationHandler.attachTokenReceived(onTokenReceived);
        PushNotificationHandler.attachNotificationReceived(onNotificationReceived);

        PushNotification.getApplicationIconBadgeNumber((badgeCount) => {
            if (badgeCount > 0) {
                PushNotification.setApplicationIconBadgeNumber(0);
            }
        });
    }

    checkPermission(cbk) {
        return PushNotification.checkPermissions(cbk);
    }

    requestPermission() {
        return PushNotification.requestPermissions();
    }

    cancelNotifications() {
        PushNotification.cancelLocalNotifications();
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotifications();
    }

    abandonPermissions() {
        PushNotification.abandonPermissions();
    }
}