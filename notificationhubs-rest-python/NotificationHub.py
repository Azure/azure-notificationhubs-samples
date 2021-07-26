import time
import hmac
import base64
import hashlib
import json
import requests

# allows urllib.parse.quote below to be compatible with Python 2
import six.moves.urllib as urllib


# Reference for REST API:
# https://msdn.microsoft.com/en-us/library/mt608572.aspx
# Reference for
class AzureNotification:
    def __init__(self, notification_format=None, payload=None):
        valid_formats = ['template', 'apple', 'gcm', 'windows', 'windowsphone', "adm", "baidu"]
        if not any(x in notification_format for x in valid_formats):
            raise Exception(
                "Invalid Notification format. " +
                "Must be one of the following - 'template', 'apple', 'gcm', 'windows', 'windowsphone', 'adm', 'baidu'")

        self.format = notification_format
        self.payload = payload

        # array with keynames for headers
        # Note: Some headers are mandatory: Windows: X-WNS-Type, WindowsPhone: X-NotificationType
        # Note: For Apple you can set Expiry with header: ServiceBusNotification-ApnsExpiry
        # in W3C DTF, YYYY-MM-DDThh:mmTZD (for example, 1997-07-16T19:20+01:00).
        self.headers = None


class AzureNotificationHub:
    DEVICE_TOKEN_HEADER_NAME = "ServiceBusNotification-DeviceHandle"
    TAGS_HEADER_NAME = "ServiceBusNotification-Tags"
    API_VERSION = "api-version=2015-04"
    DEBUG_SEND = "&test"
    SCHEDULED_NOTIFICATION_HEADER_NAME = 'ServiceBusNotification-ScheduleTime'
    SCHEDULED_NOTIFICATION_FORMAT_HEADER_NAME = 'ServiceBusNotification-Format'

    @classmethod
    def __init__(cls, connection_string=None, hub_name=None, debug=0):
        cls.HubName = hub_name
        cls.Debug = debug

        # Parse connection string
        parts = connection_string.split(';')
        if len(parts) != 3:
            raise Exception("Invalid ConnectionString.")

        for part in parts:
            if part.startswith('Endpoint'):
                cls.Endpoint = 'https' + part[11:]
            if part.startswith('SharedAccessKeyName'):
                cls.SasKeyName = part[20:]
            if part.startswith('SharedAccessKey'):
                cls.SasKeyValue = part[16:]

    @staticmethod
    def __get_expiry():
        # By default returns an expiration of 5 minutes (=300 seconds) from now
        return int(round(time.time() + 300))

    @staticmethod
    def __encode_base64(data):
        return base64.b64encode(data)

    @classmethod
    def __sign_string(cls, to_sign):
        key = cls.SasKeyValue.encode('utf-8')
        to_sign = to_sign.encode('utf-8')
        signed_hmac_sha256 = hmac.HMAC(key, to_sign, hashlib.sha256)
        digest = signed_hmac_sha256.digest()
        encoded_digest = cls.__encode_base64(digest)
        return encoded_digest

    @classmethod
    def __generate_sas_token(cls):
        target_uri = cls.Endpoint + cls.HubName
        my_uri = urllib.parse.quote(target_uri, '').lower()
        expiry = str(cls.__get_expiry())
        to_sign = my_uri + '\n' + expiry
        signature = urllib.parse.quote(cls.__sign_string(to_sign))
        auth_format = 'SharedAccessSignature sig={0}&se={1}&skn={2}&sr={3}'
        sas_token = auth_format.format(signature, expiry, cls.SasKeyName, my_uri)
        return sas_token

    @classmethod
    def __make_http_request(cls, url, payload, headers):
        if cls.Debug > 0:
            # adding this querystring parameter gets detailed information about the PNS send notification outcome
            url += cls.DEBUG_SEND
            print("--- REQUEST ---")
            print("URI: " + url)
            print("Headers: " + json.dumps(headers, sort_keys=True, indent=4, separators=(' ', ': ')))
            print("--- END REQUEST ---\n")

        response = requests.post(url, data=payload, headers=headers)

        if cls.Debug > 0:
            # print out detailed response information for debugging purpose
            print("\n\n--- RESPONSE ---")
            print("Code:" + str(response.status_code) + " / Reason: " + response.reason)
            print("Headers: " + json.dumps(dict(response.headers), sort_keys=True, indent=4, separators=(' ', ': ')))
            print("Content:\n" + response.text)
            print("--- END RESPONSE ---")

        elif response.status_code != 201:
            # Successful outcome of send message is HTTP 201 - Created
            raise Exception(
                "Error sending notification. Received HTTP code " + str(response.status_code) + " " + response.reason)

        response.close()
        return response.status_code

    # scheduled_time must be UTC
    @classmethod
    def __send_notification(cls, notification, is_direct, tag_or_tag_expression=None, scheduled_time=None,
                            device_handle=None, skip_send=False):
        json_platforms = ['template', 'apple', 'gcm', 'adm', 'baidu']

        if any(x in notification.format for x in json_platforms):
            content_type = "application/json"
            payload_to_send = json.dumps(notification.payload)
        else:
            content_type = "application/xml"
            payload_to_send = notification.payload

        headers = {
            'Content-type': content_type,
            'Authorization': cls.__generate_sas_token(),
            cls.SCHEDULED_NOTIFICATION_FORMAT_HEADER_NAME: notification.format
        }

        url = cls.Endpoint + cls.HubName

        if scheduled_time is None:
            url += '/messages'
        else:
            url += '/schedulednotifications'
            # format for UTC date:
            # "yyyy-MM-dd'T'HH:mm:ss" Ex: 2001-07-04T12:08:56
            scheduled_time_header = scheduled_time.strftime("%Y-%m-%d'T'%H:%M:%S")
            headers[cls.SCHEDULED_NOTIFICATION_HEADER_NAME] = scheduled_time_header

        if is_direct:
            if device_handle is None:
                raise Exception("Error sending direct notification. Missing PNS device handle.")

            url += "/?direct"
            url += "&" + cls.API_VERSION

            headers[cls.DEVICE_TOKEN_HEADER_NAME] = device_handle
        else:
            url += "/?" + cls.API_VERSION

        if isinstance(tag_or_tag_expression, set):
            tag_list = ' || '.join(tag_or_tag_expression)
        else:
            tag_list = tag_or_tag_expression

        # add the tags/tag expressions to the headers collection
        if tag_list != "":
            headers.update({cls.TAGS_HEADER_NAME: tag_list})

        # add any custom headers to the headers collection that the user may have added
        if notification.headers is not None:
            headers.update(notification.headers)

        if skip_send:
            status = 201
        else:
            status = cls.__make_http_request(url, payload_to_send, headers)

        return status, headers

    def send_apple_notification(self, is_direct, payload, tags="", device_handle=None, scheduled_time=None,
                                skip_send=False):
        nh = AzureNotification("apple", payload)

        status, headers = self.__send_notification(nh, is_direct=is_direct, tag_or_tag_expression=tags,
                                                   device_handle=device_handle,
                                                   scheduled_time=scheduled_time,
                                                   skip_send=skip_send)
        return status, headers

    def send_google_notification(self, is_direct, payload, tags="", device_handle=None, scheduled_time=None,
                                 skip_send=False):
        nh = AzureNotification("gcm", payload)

        status, headers = self.__send_notification(nh, is_direct=is_direct, tag_or_tag_expression=tags,
                                                   device_handle=device_handle,
                                                   scheduled_time=scheduled_time, skip_send=skip_send)
        return status, headers

    def send_amazon_notification(self, is_direct, payload, tags="", device_handle=None, scheduled_time=None,
                                 skip_send=False):
        nh = AzureNotification("adm", payload)

        status, headers = self.__send_notification(nh, is_direct=is_direct, tag_or_tag_expression=tags,
                                                   device_handle=device_handle,
                                                   scheduled_time=scheduled_time,
                                                   skip_send=skip_send)
        return status, headers

    def send_baidu_notification(self, is_direct, payload, tags="", device_handle=None, scheduled_time=None,
                                skip_send=False):
        nh = AzureNotification("baidu", payload)

        status, headers = self.__send_notification(nh, is_direct=is_direct, tag_or_tag_expression=tags,
                                                   device_handle=device_handle,
                                                   scheduled_time=scheduled_time,
                                                   skip_send=skip_send)
        return status, headers

    def send_windows_phone_notification(self, is_direct, payload, tags="", device_handle=None, scheduled_time=None,
                                        skip_send=False):
        nh = AzureNotification("windowsphone", payload)

        if "<wp:Toast>" in payload:
            nh.headers = {'X-WindowsPhone-Target': 'toast', 'X-NotificationClass': '2'}
        elif "<wp:Tile>" in payload:
            nh.headers = {'X-WindowsPhone-Target': 'tile', 'X-NotificationClass': '1'}

        status, headers = self.__send_notification(nh, is_direct=is_direct, tag_or_tag_expression=tags,
                                                   device_handle=device_handle,
                                                   scheduled_time=scheduled_time,
                                                   skip_send=skip_send)
        return status, headers

    # example wns payload =
    # """<toast><visual><binding template=\"ToastText01\"><text id=\"1\">Python Test</text></binding></visual></toast>"""
    def send_windows_notification(self, is_direct, payload, tags="", device_handle=None, scheduled_time=None,
                                  skip_send=False):
        nh = AzureNotification("windows", payload)

        if "<toast>" in payload:
            nh.headers = {'X-WNS-Type': 'wns/toast'}
        elif "<tile>" in payload:
            nh.headers = {'X-WNS-Type': 'wns/tile'}
        elif "<badge>" in payload:
            nh.headers = {'X-WNS-Type': 'wns/badge'}

        status, headers = self.__send_notification(nh, is_direct=is_direct, tag_or_tag_expression=tags,
                                                   device_handle=device_handle,
                                                   scheduled_time=scheduled_time,
                                                   skip_send=skip_send)
        return status, headers

    def send_template_notification(self, properties, tags="", scheduled_time=None, skip_send=False):
        nh = AzureNotification("template", properties)
        status, headers = self.__send_notification(nh, is_direct=False, tag_or_tag_expression=tags,
                                                   scheduled_time=scheduled_time,
                                                   skip_send=skip_send)

        return status, headers
