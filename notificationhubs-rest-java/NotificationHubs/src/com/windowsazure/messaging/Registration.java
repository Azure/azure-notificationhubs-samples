package com.windowsazure.messaging;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.apache.commons.digester3.Digester;
import org.apache.commons.digester3.ObjectCreationFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;

/**
 * Abstract class representing a registration.
 *
 */
public abstract class Registration implements Cloneable {
	protected String registrationId;
	protected Set<String> tags = new HashSet<String>();
	protected String etag;
	protected Date expirationTime;
	
	private static Digester singleRegParser;
	private static Digester multiRegParser;
	
	static {
		singleRegParser = new Digester();
		addRegistrationRules(singleRegParser);
		
		multiRegParser = new Digester();
		addRegistrationRules(multiRegParser);
		addCollectionRules(multiRegParser);
	}

	public Registration() {
	}
	
	public Registration clone(){  
	    try {
			return (Registration) super.clone();
		} catch (CloneNotSupportedException e) {
			throw new RuntimeException(e);
		}  
	}

	public Registration(String registrationId) {
		super();
		this.registrationId = registrationId;
	}

	public Registration(Set<String> tags) {
		super();
		this.tags = tags;
	}

	public abstract String getXml();

	public String getRegistrationId() {
		return registrationId;
	}

	public void setRegistrationId(String registrationId) {
		this.registrationId = registrationId;
	}

	public Set<String> getTags() {
		return tags;
	}

	public void setTags(Set<String> tags) {
		this.tags = tags;
	}

	public String getEtag() {
		return etag;
	}

	public void setEtag(String etag) {
		this.etag = etag;
	}

	public void setTagsFromString(String string) {
		tags = new HashSet<String>();
		String[] tagsArray = string.split(",");
		for (int i = 0; i < tagsArray.length; i++) {
			tags.add(tagsArray[i].trim());
		}
	}

	protected String getTagsXml() {
		StringBuffer buf = new StringBuffer();
		if (!tags.isEmpty()) {
			buf.append("<Tags>");
			for (Iterator<String> i = tags.iterator(); i.hasNext();) {
				buf.append(i.next());
				if (i.hasNext())
					buf.append(",");
			}
			buf.append("</Tags>");
		}
		return buf.toString();
	}
	
	

	public Date getExpirationTime() {
		return expirationTime;
	}

	public void setExpirationTime(Date expirationTime) {
		this.expirationTime = expirationTime;
	}

	public void setExpirationTimeFromString(String expirationTimeString) throws ParseException {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
		
		this.expirationTime = df.parse(expirationTimeString);
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((etag == null) ? 0 : etag.hashCode());
		result = prime * result
				+ ((expirationTime == null) ? 0 : expirationTime.hashCode());
		result = prime * result
				+ ((registrationId == null) ? 0 : registrationId.hashCode());
		result = prime * result + ((tags == null) ? 0 : tags.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Registration other = (Registration) obj;
		if (etag == null) {
			if (other.etag != null)
				return false;
		} else if (!etag.equals(other.etag))
			return false;
		if (expirationTime == null) {
			if (other.expirationTime != null)
				return false;
		} else if (!expirationTime.equals(other.expirationTime))
			return false;
		if (registrationId == null) {
			if (other.registrationId != null)
				return false;
		} else if (!registrationId.equals(other.registrationId))
			return false;
		if (tags == null) {
			if (other.tags != null)
				return false;
		} else if (!tags.equals(other.tags))
			return false;
		return true;
	}

	public static Registration parse(InputStream content) throws IOException,
			SAXException {
		//Digester digester = new Digester();
		//addRegistrationRules(digester);

		return singleRegParser.parse(content);
	}

	private static void addRegistrationRules(Digester digester) {
		digester.addFactoryCreate("*/RegistrationDescription",
				new Registration.RegistrationCreationFactory());
		digester.addObjectCreate("*/WindowsRegistrationDescription",
				WindowsRegistration.class);
		digester.addObjectCreate("*/WindowsTemplateRegistrationDescription",
				WindowsTemplateRegistration.class);
		digester.addObjectCreate("*/AppleRegistrationDescription",
				AppleRegistration.class);
		digester.addObjectCreate("*/AppleTemplateRegistrationDescription",
				AppleTemplateRegistration.class);
		digester.addObjectCreate("*/GcmRegistrationDescription",
				GcmRegistration.class);
		digester.addObjectCreate("*/GcmTemplateRegistrationDescription",
				GcmTemplateRegistration.class);
		digester.addObjectCreate("*/MpnsRegistrationDescription",
				MpnsRegistration.class);
		digester.addObjectCreate("*/MpnsTemplateRegistrationDescription",
				MpnsTemplateRegistration.class);
		digester.addObjectCreate("*/AdmRegistrationDescription",
				AdmRegistration.class);
		digester.addObjectCreate("*/AdmTemplateRegistrationDescription",
				AdmTemplateRegistration.class);
		digester.addCallMethod("*/RegistrationId", "setRegistrationId", 1);
		digester.addCallParam("*/RegistrationId", 0);
		digester.addCallMethod("*/ETag", "setEtag", 1);
		digester.addCallParam("*/ETag", 0);
		digester.addCallMethod("*/ChannelUri", "setChannelUri", 1);
		digester.addCallParam("*/ChannelUri", 0);
		digester.addCallMethod("*/DeviceToken", "setDeviceToken", 1);
		digester.addCallParam("*/DeviceToken", 0);
		digester.addCallMethod("*/GcmRegistrationId", "setGcmRegistrationId", 1);
		digester.addCallParam("*/GcmRegistrationId", 0);
		digester.addCallMethod("*/Tags", "setTagsFromString", 1);
		digester.addCallParam("*/Tags", 0);
		digester.addCallMethod("*/BodyTemplate", "setBodyTemplate", 1);
		digester.addCallParam("*/BodyTemplate", 0);
		digester.addCallMethod("*/WnsHeader", "addHeader", 2);
		digester.addCallParam("*/WnsHeader/Header", 0);
		digester.addCallParam("*/WnsHeader/Value", 1);
		digester.addCallMethod("*/MpnsHeader", "addHeader", 2);
		digester.addCallParam("*/MpnsHeader/Header", 0);
		digester.addCallParam("*/MpnsHeader/Value", 1);
		digester.addCallMethod("*/Expiry", "setExpiry", 1);
		digester.addCallParam("*/Expiry", 0);
		digester.addCallMethod("*/ExpirationTime", "setExpirationTimeFromString", 1);
		digester.addCallParam("*/ExpirationTime", 0);
		digester.addCallMethod("*/AdmRegistrationId", "setAdmRegistrationId", 1);
		digester.addCallParam("*/AdmRegistrationId", 0);
	}

	public static CollectionResult parseRegistrations(InputStream content)
			throws IOException, SAXException {
		return multiRegParser.parse(content);
	}

	private static void addCollectionRules(Digester digester) {
		digester.addObjectCreate("feed", CollectionResult.class);
		digester.addSetNext("*/RegistrationDescription", "addRegistration");
		digester.addSetNext("*/WindowsRegistrationDescription", "addRegistration");
		digester.addSetNext("*/WindowsTemplateRegistrationDescription", "addRegistration");
		digester.addSetNext("*/AppleRegistrationDescription", "addRegistration");
		digester.addSetNext("*/AppleTemplateRegistrationDescription", "addRegistration");
		digester.addSetNext("*/GcmRegistrationDescription", "addRegistration");
		digester.addSetNext("*/GcmTemplateRegistrationDescription", "addRegistration");
		digester.addSetNext("*/MpnsRegistrationDescription", "addRegistration");
		digester.addSetNext("*/MpnsTemplateRegistrationDescription", "addRegistration");
		digester.addSetNext("*/AdmRegistrationDescription", "addRegistration");
		digester.addSetNext("*/AdmTemplateRegistrationDescription", "addRegistration");
	}

	public static class RegistrationCreationFactory implements
			ObjectCreationFactory {
		private Digester digester;

		@Override
		public Object createObject(Attributes attributes) throws Exception {
			if ("WindowsRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new WindowsRegistration();
			}
			if ("WindowsTemplateRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new WindowsTemplateRegistration();
			}
			if ("AppleRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new AppleRegistration();
			}
			if ("AppleTemplateRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new AppleTemplateRegistration();
			}
			if ("GcmRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new GcmRegistration();
			}
			if ("GcmTemplateRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new GcmTemplateRegistration();
			}
			if ("MpnsRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new MpnsRegistration();
			}
			if ("MpnsTemplateRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new MpnsTemplateRegistration();
			}
			if ("AdmRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new AdmRegistration();
			}
			if ("AdmTemplateRegistrationDescription".equals(attributes
					.getValue("i:type"))) {
				return new AdmTemplateRegistration();
			}
			throw new UnsupportedOperationException("unknown type: "
					+ attributes.getValue("i:type"));
		}

		@Override
		public Digester getDigester() {
			return digester;
		}

		@Override
		public void setDigester(Digester digester) {
			this.digester = digester;
		}

	}

}
