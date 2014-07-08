package com.windowsazure.messaging;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.http.entity.ContentType;

/**
 * 
 * Class representing a generic notification.
 * 
 */
public class Notification {

	private Map<String, String> headers = new HashMap<String, String>();
	private String body;
	private ContentType contentType;

	/**
	 * Utility method to set up a native notification for WNS. Sets the
	 * X-WNS-Type headers based on the body provided. If you want to send raw
	 * notifications you have to set the X-WNS header after creating this
	 * notification.
	 * 
	 * @param body
	 * @return
	 */
	public static Notification createWindowsNotification(String body) {
		Notification n = new Notification();
		n.body = body;

		n.headers.put("ServiceBusNotification-Format", "windows");

		if (body.contains("<toast>"))
			n.headers.put("X-WNS-Type", "wns/toast");
		if (body.contains("<tile>"))
			n.headers.put("X-WNS-Type", "wns/tile");
		if (body.contains("<badge>"))
			n.headers.put("X-WNS-Type", "wns/badge");

		if (body.startsWith("<")) {
			n.contentType = ContentType.APPLICATION_XML;
		}

		return n;
	}

	/**
	 * Utility method to set up a native notification for APNs.
	 * 
	 * @param body
	 * @return
	 */
	public static Notification createAppleNotifiation(String body) {
		Notification n = new Notification();
		n.body = body;
		n.contentType = ContentType.APPLICATION_JSON;

		n.headers.put("ServiceBusNotification-Format", "apple");

		return n;
	}

	/**
	 * Utility method to set up a native notification for GCM.
	 * 
	 * @param body
	 * @return
	 */
	public static Notification createGcmNotifiation(String body) {
		Notification n = new Notification();
		n.body = body;
		n.contentType = ContentType.APPLICATION_JSON;

		n.headers.put("ServiceBusNotification-Format", "gcm");

		return n;
	}
	
	/**
	 * Utility method to set up a native notification for ADM.
	 * 
	 * @param body
	 * @return
	 */
	public static Notification createAdmNotifiation(String body) {
		Notification n = new Notification();
		n.body = body;
		n.contentType = ContentType.APPLICATION_JSON;

		n.headers.put("ServiceBusNotification-Format", "adm");

		return n;
	}

	/**
	 * Utility method to set up a native notification for MPNS. Sets the
	 * X-WindowsPhone-Target and X-NotificationClass headers based on the body
	 * provided. If you want to send raw notifications you have to set those
	 * headers after creating this notification.
	 * 
	 * @param body
	 * @return
	 */
	public static Notification createMpnsNotifiation(String body) {
		Notification n = new Notification();
		n.body = body;

		n.headers.put("ServiceBusNotification-Format", "windowsphone");

		if (body.contains("<wp:Toast>")) {
			n.headers.put("X-WindowsPhone-Target", "toast");
			n.headers.put("X-NotificationClass", "2");
		}
		if (body.contains("<wp:Tile>")) {
			n.headers.put("X-WindowsPhone-Target", "tile");
			n.headers.put("X-NotificationClass", "1");
		}

		if (body.startsWith("<")) {
			n.contentType = ContentType.APPLICATION_XML;
		}

		return n;
	}

	/**
	 * Utility method to create a notification object representing a template notification.
	 * 
	 * @param properties
	 * @return
	 */
	public static Notification createTemplateNotification(
			Map<String, String> properties) {
		Notification n = new Notification();
		StringBuffer buf = new StringBuffer();
		buf.append("{");
		for (Iterator<String> iterator = properties.keySet().iterator(); iterator
				.hasNext();) {
			String key = iterator.next();
			buf.append("\"" + key + "\":\"" + properties.get(key) + "\"");
			if (iterator.hasNext())
				buf.append(",");
		}
		buf.append("}");
		n.body = buf.toString();

		n.contentType = ContentType.APPLICATION_JSON;

		n.headers.put("ServiceBusNotification-Format", "template");

		return n;
	}

	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public ContentType getContentType() {
		return contentType;
	}

	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}

}
