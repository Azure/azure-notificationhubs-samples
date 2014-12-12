# Notification Hubs REST wrapper for Python

This is a sample implementation of a REST wrapper for sending notifications with Notification Hubs using the [REST APIs of Notification Hubs](http://msdn.microsoft.com/en-us/library/dn495827.aspx) from a Python back-end.

## How to use the code above

Detailed readme is available here - 
http://azure.microsoft.com/en-us/documentation/articles/notification-hubs-python-backend-how-to/

## Registration management

For registration management you have to follow the content formats shown in the [REST APIs of Notification Hubs](http://msdn.microsoft.com/en-us/library/dn495827.aspx), and probably do some xml parsing is case of GETs. Be warned that element order is important and things will not work if the element are out of order.

## Notes
This code is provided as-is with no guarantees.

## Contributors
Adrian Hall (Splunk)
