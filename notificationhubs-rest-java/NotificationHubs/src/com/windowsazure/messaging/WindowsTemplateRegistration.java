package com.windowsazure.messaging;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 * Class representing a registration for template notifications for devices using WNS.
 *
 */
public class WindowsTemplateRegistration extends WindowsRegistration {
	private static final String WNS_TEMPLATE_REGISTRATION1 = "<?xml version=\"1.0\" encoding=\"utf-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\"><content type=\"application/xml\"><WindowsTemplateRegistrationDescription xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\">";
	private static final String WNS_TEMPLATE_REGISTRATION2 = "<ChannelUri>";
	private static final String WNS_TEMPLATE_REGISTRATION3 = "</ChannelUri><BodyTemplate><![CDATA[";
	private static final String WNS_TEMPLATE_REGISTRATION4 = "]]></BodyTemplate>";
	private static final String WNS_TEMPLATE_REGISTRATION5 = "</WindowsTemplateRegistrationDescription></content></entry>";

	private String bodyTemplate;
	private Map<String, String> headers = new HashMap<String, String>();

	public WindowsTemplateRegistration() {
	}
	
	
	
	public WindowsTemplateRegistration(URI channelUri, String bodyTemplate,
			Map<String, String> headers) {
		super(channelUri);
		this.bodyTemplate = bodyTemplate;
		this.headers = headers;
	}

	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result
				+ ((bodyTemplate == null) ? 0 : bodyTemplate.hashCode());
		result = prime * result + ((headers == null) ? 0 : headers.hashCode());
		return result;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		WindowsTemplateRegistration other = (WindowsTemplateRegistration) obj;
		if (bodyTemplate == null) {
			if (other.bodyTemplate != null)
				return false;
		} else if (!bodyTemplate.equals(other.bodyTemplate))
			return false;
		if (headers == null) {
			if (other.headers != null)
				return false;
		} else if (!headers.equals(other.headers))
			return false;
		return true;
	}



	public WindowsTemplateRegistration(URI channelUri,
			String bodyTemplate) {
		super(channelUri);
		this.bodyTemplate = bodyTemplate;
	}

	public String getBodyTemplate() {
		return bodyTemplate;
	}

	public void setBodyTemplate(String bodyTemplate) {
		this.bodyTemplate = bodyTemplate;
	}

	public Map<String, String> getHeaders() {
		return headers;
	}
	
	public void addHeader(String name, String value) {
		headers.put(name, value);
	}

	@Override
	public String getXml() {
		StringBuffer buf = new StringBuffer();
		buf.append(WNS_TEMPLATE_REGISTRATION1);
		buf.append(getTagsXml());
		buf.append(WNS_TEMPLATE_REGISTRATION2);
		buf.append(channelUri.toString());
		buf.append(WNS_TEMPLATE_REGISTRATION3);
		buf.append(bodyTemplate);
		buf.append(WNS_TEMPLATE_REGISTRATION4);
		buf.append(getHeadersXml());
		buf.append(WNS_TEMPLATE_REGISTRATION5);
		return buf.toString();
	}

	private String getHeadersXml() {
		StringBuffer buf = new StringBuffer();
		if (!headers.isEmpty()) {
			buf.append("<WnsHeaders>");
			for (String key : headers.keySet()) {
				buf.append("<WnsHeader><Header>");
				buf.append(key).append("</Header><Value>");
				buf.append(headers.get(key)).append("</Value></WnsHeader>");
			}
		}
		buf.append("</WnsHeaders>");
		return buf.toString();
	}
}
