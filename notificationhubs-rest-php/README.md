# Notification Hubs REST wrapper for PHP

This is a sample implementation of a REST wrapper for sending notifications with Notification Hubs using the [REST APIs of Notification Hubs](http://msdn.microsoft.com/en-us/library/dn495827.aspx) from a PHP back-end.

## How to use the code above
Initialize your Notification Hubs client (substitute the connection string and hub name as instructed in the [Get started tutorial](http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-ios-get-started/)):

    $hub = new NotificationHub("connection string", "hubname"); 

Then add the send code depending on your target mobile platform.

### Windows Store and Windows Phone 8.1 (non-Silverlight)

    $toast = '<toast><visual><binding template="ToastText01"><text id="1">Hello from PHP!</text></binding></visual></toast>';
    $notification = new Notification("windows", $toast);
    $notification->headers[] = 'X-WNS-Type: wns/toast';
    $hub->sendNotification($notification, null);

### iOS

    $alert = '{"aps":{"alert":"Hello from PHP!"}}';
    $notification = new Notification("apple", $alert);
    $hub->sendNotification($notification, null);

### Android

    $message = '{"data":{"message":"Hello from PHP!"}}';
    $notification = new Notification("gcm", $message);
    $hub->sendNotification($notification, null);

### Windows Phone 8.0 and 8.1 Silverlight

    $toast = '<?xml version="1.0" encoding="utf-8"?>' .
                '<wp:Notification xmlns:wp="WPNotification">' .
                   '<wp:Toast>' .
                        '<wp:Text1>Hello from PHP!</wp:Text1>' .
                   '</wp:Toast> ' .
                '</wp:Notification>';
    $notification = new Notification("mpns", $toast);
    $notification->headers[] = 'X-WindowsPhone-Target : toast';
    $notification->headers[] = 'X-NotificationClass : 2';
    $hub->sendNotification($notification, null);


### Kindle Fire

    $message = '{"data":{"msg":"Hello from PHP!"}}';
    $notification = new Notification("adm", $message);
    $hub->sendNotification($notification, null);

## Registration management

For registration management you have to follow the content formats shown in the [REST APIs of Notification Hubs](http://msdn.microsoft.com/en-us/library/dn495827.aspx), and probably do some xml parsing is case of GETs. Be warned that element order is important and things will not work if the element are out of order.

## Notes
This code is provided as-is with no guarantees.
