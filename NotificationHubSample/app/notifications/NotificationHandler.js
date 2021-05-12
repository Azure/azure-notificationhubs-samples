import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

class PushNotificationHandler {
    _onRegister;
    _onNotification;

    onNotification(notification) {
        console.log('NotificationHandler:', notification);
        this._onNotification(notification);
    }

    onRegister(token) {
        console.log('NotificationHandler:', token);
        this._onRegister(token);
    }

    attachTokenReceived(handler) {
        this._onRegister = handler;
    }

    attachNotificationReceived(handler) {
        this._onNotification = handler;
    }
}

const handler = new PushNotificationHandler();

if (Platform.OS !== 'windows') {
    PushNotification.configure({
        onRegister: handler.onRegister.bind(handler),
        onNotification: handler.onNotification.bind(handler),
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    })
}

export default handler;