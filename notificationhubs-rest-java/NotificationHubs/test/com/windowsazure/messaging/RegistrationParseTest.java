package com.windowsazure.messaging;
import static org.junit.Assert.*;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;

import org.hamcrest.core.IsInstanceOf;
import org.junit.Test;
import org.xml.sax.SAXException;


public class RegistrationParseTest {
	private static final String CHANNELURI = "https://bn1.notify.windows.com/?token=AgYAAADYej13M9aml3liD9nlfJw6FEgGXDvYmKDOfOwcS2ekCUm7hIrsJhGqkvU35pmJHFmXVbeUKJawqNHQKCtNJaI4z3uf3Gn04nrdSMUgzFapd%2fXYwzREnjz6%2fk9Pl6cy%2bdI%3d";
	private static final String REGID = "8372532420827572008-85883004107185159-4";
	private static final String WNSBODYTEMPLATE = "<toast><visual><binding template=\"ToastText01\"><text id=\"1\">From any .NET App!</text></binding></visual></toast>";
	private static final String DEVICETOKEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final String APNSBODYTEMPLATE = "{ \"aps\": { \"alert\": \"$(message)\"} }";
	private static final String EXPIRYTEMPLATE = "$(expiry)";
	private static final String GCMREGID = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final String GCMBODYTEMPLATE = "{ \"aps\": { \"alert\": \"$(message)\"} }";
	private static final String MPNSCHANNELURI = "http://dm2.notify.live.net/throttledthirdparty/01.00/AQG9Ed13-Lb5RbCii5fWzpFpAgAAAAADAQAAAAQUZm52OkJCMjg1QTg1QkZDMkUxREQFBlVTTkMwMQ";
	private static final String MPNSBODYTEMPLATE = "<wp:Notification xmlns:wp=\"WPNotification\"><wp:Toast><wp:Text1>$(message)</wp:Text1></wp:Toast></wp:Notification>";
	private static final Date EXPIRATIONTIME = new Date(1409587066778L);
	private static final Object ADMREGID = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final Object ADMBODYTEMPLATE = "{ \"aps\": { \"alert\": \"$(message)\"} }";
	
	@Test
	public void testParseNativeRegistration1() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("WindowsNativeRegistrationNoType");
		
		WindowsRegistration reg = (WindowsRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(WindowsRegistration.class, reg.getClass());
		
		assertEquals(new URI(CHANNELURI), reg.getChannelUri());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		assertEquals(EXPIRATIONTIME, reg.getExpirationTime());
		
	}
	
	@Test
	public void testParseNativeRegistration2() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("WindowsNativeRegistrationType");
		
		WindowsRegistration reg = (WindowsRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(WindowsRegistration.class, reg.getClass());
		
		assertEquals(new URI(CHANNELURI), reg.getChannelUri());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
	}
	
	@Test
	public void testParseTemplateRegistration1() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("WindowsTemplateRegistrationNoType");
		
		WindowsTemplateRegistration reg = (WindowsTemplateRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(WindowsTemplateRegistration.class, reg.getClass());
		
		assertEquals(new URI(CHANNELURI), reg.getChannelUri());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
		assertEquals(WNSBODYTEMPLATE, reg.getBodyTemplate());
		assertEquals(2, reg.getHeaders().size());
	}
	
	@Test
	public void testParseTemplateRegistration2() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("WindowsTemplateRegistrationType");
		
		WindowsTemplateRegistration reg = (WindowsTemplateRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(WindowsTemplateRegistration.class, reg.getClass());
		
		assertEquals(new URI(CHANNELURI), reg.getChannelUri());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
		assertEquals(WNSBODYTEMPLATE, reg.getBodyTemplate());
		assertEquals(2, reg.getHeaders().size());
	}
	
	@Test
	public void testParseAppleNativeRegistration1() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("AppleNativeRegistrationNoType");
		
		AppleRegistration reg = (AppleRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(AppleRegistration.class, reg.getClass());
		
		assertEquals(DEVICETOKEN, reg.getDeviceToken());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
	}
	
	@Test
	public void testParseAppleNativeRegistration2() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("AppleNativeRegistrationType");
		
		AppleRegistration reg = (AppleRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(AppleRegistration.class, reg.getClass());
		
		assertEquals(DEVICETOKEN, reg.getDeviceToken());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
	}
	
	@Test
	public void testParseAppleTemplateRegistration1() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("AppleTemplateRegistrationNoType");
		
		AppleTemplateRegistration reg = (AppleTemplateRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(AppleTemplateRegistration.class, reg.getClass());
		
		assertEquals(DEVICETOKEN, reg.getDeviceToken());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
		assertEquals(APNSBODYTEMPLATE, reg.getBodyTemplate());
		assertEquals(EXPIRYTEMPLATE, reg.getExpiry());
	}
	
	@Test
	public void testParseAppleTemplateRegistration2() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("AppleTemplateRegistrationType");
		
		AppleTemplateRegistration reg = (AppleTemplateRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(AppleTemplateRegistration.class, reg.getClass());
		
		assertEquals(DEVICETOKEN, reg.getDeviceToken());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
		assertEquals(APNSBODYTEMPLATE, reg.getBodyTemplate());
		assertEquals(EXPIRYTEMPLATE, reg.getExpiry());
	}
	
	@Test
	public void testParseGcmNativeRegistration2() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("GcmNativeRegistrationType");
		
		GcmRegistration reg = (GcmRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(GcmRegistration.class, reg.getClass());
		
		assertEquals(GCMREGID, reg.getGcmRegistrationId());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
	}
	
	@Test
	public void testParseGcmTemplateRegistration1() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("GcmTemplateRegistrationNoType");
		
		GcmTemplateRegistration reg = (GcmTemplateRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(GcmTemplateRegistration.class, reg.getClass());
		
		assertEquals(GCMREGID, reg.getGcmRegistrationId());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
		assertEquals(GCMBODYTEMPLATE, reg.getBodyTemplate());
	}
	
	@Test
	public void testParseMpnsNativeRegistration2() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("MpnsNativeRegistrationNoType");
		
		MpnsRegistration reg = (MpnsRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(MpnsRegistration.class, reg.getClass());
		
		assertEquals(new URI(MPNSCHANNELURI), reg.getChannelUri());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
	}
	
	@Test
	public void testParseMpnsTemplateRegistration1() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("MpnsTemplateRegistrationType");
		
		MpnsTemplateRegistration reg = (MpnsTemplateRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(MpnsTemplateRegistration.class, reg.getClass());
		
		assertEquals(new URI(MPNSCHANNELURI), reg.getChannelUri());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
		assertEquals(MPNSBODYTEMPLATE, reg.getBodyTemplate());
		assertEquals(1, reg.getHeaders().size());
	}
	
	@Test
	public void testParseAdmNativeRegistration2() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("AdmNativeRegistrationType");
		
		AdmRegistration reg = (AdmRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(AdmRegistration.class, reg.getClass());
		
		assertEquals(ADMREGID, reg.getAdmRegistrationId());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
	}
	
	@Test
	public void testParseAdmTemplateRegistration1() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("AdmTemplateRegistrationNoType");
		
		AdmTemplateRegistration reg = (AdmTemplateRegistration) Registration.parse(xml);
		
		assertNotNull(reg);
		
		assertEquals(AdmTemplateRegistration.class, reg.getClass());
		
		assertEquals(ADMREGID, reg.getAdmRegistrationId());
		assertEquals("3", reg.getEtag());
		assertEquals(REGID, reg.getRegistrationId());
		assertEquals(2, reg.getTags().size());
		
		assertEquals(ADMBODYTEMPLATE, reg.getBodyTemplate());
	}
	
	@Test
	public void testParseCollection() throws IOException, SAXException, URISyntaxException {
		InputStream xml = this.getClass().getResourceAsStream("RegistrationCollection");
		
		CollectionResult coll = Registration.parseRegistrations(xml);
		
		assertNotNull(coll);
		
		assertEquals(4, coll.getRegistrations().size());
	}

}
