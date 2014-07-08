package com.windowsazure.messaging;

public class AdmTemplateRegistration extends AdmRegistration {
	private static final String ADM_TEMPLATE_REGISTRATION1 = "<?xml version=\"1.0\" encoding=\"utf-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\"><content type=\"application/xml\"><AdmTemplateRegistrationDescription xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\">";
	private static final String ADM_TEMPLATE_REGISTRATION2 = "<AdmRegistrationId>";
	private static final String ADM_TEMPLATE_REGISTRATION3 = "</AdmRegistrationId><BodyTemplate><![CDATA[";
	private static final String ADM_TEMPLATE_REGISTRATION4 = "]]></BodyTemplate></AdmTemplateRegistrationDescription></content></entry>";

	private String bodyTemplate;

	public AdmTemplateRegistration() {
		super();
	}

	public AdmTemplateRegistration(String registrationId,
			String admRegistrationId, String bodyTemplate) {
		super(registrationId, admRegistrationId);
		this.bodyTemplate = bodyTemplate;
	}

	public AdmTemplateRegistration(String admRegistrationId, String bodyTemplate) {
		super(admRegistrationId);
		this.bodyTemplate = bodyTemplate;
	}

	public String getBodyTemplate() {
		return bodyTemplate;
	}

	public void setBodyTemplate(String bodyTemplate) {
		this.bodyTemplate = bodyTemplate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result
				+ ((bodyTemplate == null) ? 0 : bodyTemplate.hashCode());
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
		AdmTemplateRegistration other = (AdmTemplateRegistration) obj;
		if (bodyTemplate == null) {
			if (other.bodyTemplate != null)
				return false;
		} else if (!bodyTemplate.equals(other.bodyTemplate))
			return false;
		return true;
	}

	@Override
	public String getXml() {
		StringBuffer buf = new StringBuffer();
		buf.append(ADM_TEMPLATE_REGISTRATION1);
		buf.append(getTagsXml());
		buf.append(ADM_TEMPLATE_REGISTRATION2);
		buf.append(admRegistrationId);
		buf.append(ADM_TEMPLATE_REGISTRATION3);
		buf.append(bodyTemplate);
		buf.append(ADM_TEMPLATE_REGISTRATION4);
		return buf.toString();
	}
}
