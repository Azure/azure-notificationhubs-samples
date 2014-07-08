package com.windowsazure.messaging;

public class AdmRegistration extends Registration {
	private static final String ADM_NATIVE_REGISTRATION1 = "<?xml version=\"1.0\" encoding=\"utf-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\"><content type=\"application/xml\"><AdmRegistrationDescription xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\">";
	private static final String ADM_NATIVE_REGISTRATION2 = "<AdmRegistrationId>";
	private static final String ADM_NATIVE_REGISTRATION3 = "</AdmRegistrationId></AdmRegistrationDescription></content></entry>";

	protected String admRegistrationId;
	
	public AdmRegistration() {
		super();
	}

	public AdmRegistration(String registrationId, String admRegistrationId) {
		super(registrationId);
		this.admRegistrationId = admRegistrationId;
	}
	
	public AdmRegistration(String admRegistrationId) {
		super();
		this.admRegistrationId = admRegistrationId;
	}

	public String getAdmRegistrationId() {
		return admRegistrationId;
	}

	public void setAdmRegistrationId(String admRegistrationId) {
		this.admRegistrationId = admRegistrationId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime
				* result
				+ ((admRegistrationId == null) ? 0 : admRegistrationId
						.hashCode());
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
		AdmRegistration other = (AdmRegistration) obj;
		if (admRegistrationId == null) {
			if (other.admRegistrationId != null)
				return false;
		} else if (!admRegistrationId.equals(other.admRegistrationId))
			return false;
		return true;
	}

	@Override
	public String getXml() {
		StringBuffer buf = new StringBuffer();
		buf.append(ADM_NATIVE_REGISTRATION1);
		buf.append(getTagsXml());
		buf.append(ADM_NATIVE_REGISTRATION2);
		buf.append(admRegistrationId);
		buf.append(ADM_NATIVE_REGISTRATION3);
		return buf.toString();
	}

}
