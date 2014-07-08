package com.windowsazure.messaging;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 * Class representing a registration for template notifications for devices using MPNS.
 *
 */
public class MpnsTemplateRegistration extends MpnsRegistration {
	private static final String MPNS_TEMPLATE_REGISTRATION1 = "<?xml version=\"1.0\" encoding=\"utf-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\"><content type=\"application/xml\"><MpnsTemplateRegistrationDescription xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\">";
	private static final String MPNS_TEMPLATE_REGISTRATION2 = "<ChannelUri>";
	private static final String MPNS_TEMPLATE_REGISTRATION3 = "</ChannelUri><BodyTemplate><![CDATA[";
	private static final String MPNS_TEMPLATE_REGISTRATION4 = "]]></BodyTemplate>";
	private static final String MPNS_TEMPLATE_REGISTRATION5 = "</MpnsTemplateRegistrationDescription></content></entry>";

	private String bodyTemplate;
	private Map<String, String> headers = new HashMap<String, String>();

	public MpnsTemplateRegistration() {
	}
	
	
	
	public MpnsTemplateRegistration(URI channelUri, String bodyTemplate,
			Map<String, String> headers) {
		super(channelUri);
		this.bodyTemplate = bodyTemplate;
		this.headers = headers;
	}



	public MpnsTemplateRegistration(URI channelUri,
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
		MpnsTemplateRegistration other = (MpnsTemplateRegistration) obj;
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



	@Override
	public String getXml() {
		StringBuffer buf = new StringBuffer();
		buf.append(MPNS_TEMPLATE_REGISTRATION1);
		buf.append(getTagsXml());
		buf.append(MPNS_TEMPLATE_REGISTRATION2);
		buf.append(channelUri.toString());
		buf.append(MPNS_TEMPLATE_REGISTRATION3);
		buf.append(bodyTemplate);
		buf.append(MPNS_TEMPLATE_REGISTRATION4);
		buf.append(getHeadersXml());
		buf.append(MPNS_TEMPLATE_REGISTRATION5);
		return buf.toString();
	}

	private String getHeadersXml() {
		StringBuffer buf = new StringBuffer();
		if (!headers.isEmpty()) {
			buf.append("<MpnsHeaders>");
			for (String key : headers.keySet()) {
				buf.append("<MpnsHeader><Header>");
				buf.append(key).append("</Header><Value>");
				buf.append(headers.get(key)).append("</Value></MpnsHeader>");
			}
		}
		buf.append("</MpnsHeaders>");
		return buf.toString();
	}
}
