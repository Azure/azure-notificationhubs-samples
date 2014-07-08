package com.windowsazure.messaging.e2e;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertNull;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;

import com.windowsazure.messaging.AdmRegistration;
import com.windowsazure.messaging.AdmTemplateRegistration;
import com.windowsazure.messaging.AppleRegistration;
import com.windowsazure.messaging.AppleTemplateRegistration;
import com.windowsazure.messaging.CollectionResult;
import com.windowsazure.messaging.GcmRegistration;
import com.windowsazure.messaging.GcmTemplateRegistration;
import com.windowsazure.messaging.MpnsRegistration;
import com.windowsazure.messaging.MpnsTemplateRegistration;
import com.windowsazure.messaging.Notification;
import com.windowsazure.messaging.NotificationHub;
import com.windowsazure.messaging.WindowsRegistration;
import com.windowsazure.messaging.WindowsTemplateRegistration;

public class RegistrationCrudsE2E {
	// hub needs to have credentials for all platforms or send tests will fail
	
	
	private static final String CHANNELURI = "https://bn1.notify.windows.com/?token=AgYAAADYej13M9aml3liD9nlfJw6FEgGXDvYmKDOfOwcS2ekCUm7hIrsJhGqkvU35pmJHFmXVbeUKJawqNHQKCtNJaI4z3uf3Gn04nrdSMUgzFapd%2fXYwzREnjz6%2fk9Pl6cy%2bdI%3d";
	private static final String CHANNELURI2 = "https://bn1.notify.windows.com/?token=12345ADYej13M9aml3liD9nlfJw6FEgGXDvYmKDOfOwcS2ekCUm7hIrsJhGqkv12345JHFmXVbeUKJawqNHQKCtNJaI4z3uf3Gn04nrdSMUgzFapd%2fXYwzREnjz6%2fk9Pl6cy%2bdI%3d";
	
	private static final String WNSBODYTEMPLATE = "<toast><visual><binding template=\"ToastText01\"><text id=\"1\">From any .NET App!</text></binding></visual></toast>";
	private static final String WNSBODYTEMPLATE2 = "<toast><visual><binding template=\"ToastText01\"><text id=\"1\">From any .NET App! Second take!</text></binding></visual></toast>";
	private static final String DEVICETOKEN = "ABCDEF";
	private static final String DEVICETOKEN2 = "123456";
	private static final String APNSBODYTEMPLATE = "{\"aps\": {\"alert\": \"$(message)\"}}";
	private static final String APNSBODYTEMPLATE2 = "{\"aps\": {\"alert\": \"$(msg)\"}}";
	private static final String EXPIRYTEMPLATE = "$(expiry)";
	private static final String GCMREGID = "ABCDEF";
	private static final String GCMREGID2 = "123456";
	private static final String GCMBODYTEMPLATE = "{\"aps\": {\"alert\": \"$(message)\"}}";
	private static final String GCMBODYTEMPLATE2 = "{\"aps\": {\"alert\": \"$(msg)\"}}";
	private static final String MPNSCHANNELURI = "http://dm2.notify.live.net/throttledthirdparty/01.00/12G9Ed13dLb5RbCii5fWzpFpAgAAAAADAQAAAAQUZm52OkJCMjg1QTg1QkZDMkUxREQFBlVTTkMwMQ";
	private static final String MPNSCHANNELURI2 = "http://dm2.notify.live.net/throttledthirdparty/01.00/12G9Ed13-Lb5RbCii5fWzpFpAgAAAAADAQAAAAQUZm52OkJCMjg1QTg1QkZDMkUxREQFBlVTTkMwMQ";
	private static final String MPNSBODYTEMPLATE = "<wp:Notification xmlns:wp=\"WPNotification\"><wp:Toast><wp:Text1>$(message)</wp:Text1></wp:Toast></wp:Notification>";
	private static final String MPNSBODYTEMPLATE2 = "<wp:Notification xmlns:wp=\"WPNotification\"><wp:Toast><wp:Text1>$(msg)</wp:Text1></wp:Toast></wp:Notification>";
	private static final String ADMREGID = "ABCDEF";
	private static final String ADMREGID2 = "123456";
	private static final String ADMBODYTEMPLATE = "{\"data\":{\"key1\":\"$(value1)\"}}";
	private static final String ADMBODYTEMPLATE2 = "{\"data\":{\"key1\":\"$(value2)\"}}";
	
	
	private NotificationHub hub;

	/**
	 * Create a file called e2eSetup.properties with properties: connectionstring and hub, in order to run e2e tests.
	 * Your hub should have credentials for all platforms or some native sends will fail.
	 * 
	 * @throws Exception
	 */
	@Before
	public void setUp() throws Exception {
		Properties p = new Properties();
		p.load(this.getClass().getResourceAsStream("e2eSetup.properties"));
		
		hub = new NotificationHub(p.getProperty("connectionstring"), p.getProperty("hub"));
	}
	
	@Test
	public void testCreateRegistrationId() {
		String id = hub.createRegistrationId();
		
		assertNotNull(id);
	}
	
	@Test
	public void testCreateRegistrationIdAndUpsert() throws URISyntaxException {
		String id = hub.createRegistrationId();
		assertNotNull(id);
		
		WindowsRegistration reg = new WindowsRegistration(id, new URI(CHANNELURI));
		
		WindowsRegistration reg2 = (WindowsRegistration) hub.upsertRegistration(reg);
		assertNotNull(reg2);
		assertEquals(new URI(CHANNELURI), reg2.getChannelUri());
		assertEquals(id, reg2.getRegistrationId());
		
		reg2.setChannelUri(CHANNELURI2);
		
		WindowsRegistration reg3 = (WindowsRegistration) hub.upsertRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(new URI(CHANNELURI2), reg3.getChannelUri());
		assertEquals(id, reg3.getRegistrationId());
		
		hub.deleteRegistration(reg3.getRegistrationId());
	}

	// create + update + get + delete
	@Test
	public void testCreateAndDeleteNativeRegistration() throws URISyntaxException {
		WindowsRegistration reg = new WindowsRegistration(new URI(CHANNELURI));
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		WindowsRegistration reg2 = (WindowsRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(new URI(CHANNELURI), reg2.getChannelUri());
		assertEquals(2, reg2.getTags().size());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setChannelUri(CHANNELURI2);
		reg2.getTags().remove("myTag");
		
		WindowsRegistration reg3 = (WindowsRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(new URI(CHANNELURI2), reg3.getChannelUri());
		assertEquals(1, reg3.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		WindowsRegistration reg4 = (WindowsRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(new URI(CHANNELURI2), reg4.getChannelUri());
		assertEquals(1, reg4.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteTemplateRegistration() throws URISyntaxException {
		WindowsTemplateRegistration reg = new WindowsTemplateRegistration(new URI(CHANNELURI), WNSBODYTEMPLATE);
		reg.getHeaders().put("X-WNS-Type", "wns/toast");
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		WindowsTemplateRegistration reg2 = (WindowsTemplateRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(new URI(CHANNELURI), reg2.getChannelUri());
		assertEquals(2, reg2.getTags().size());
		assertEquals(WNSBODYTEMPLATE, reg2.getBodyTemplate());
		assertEquals(1, reg2.getHeaders().size());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setChannelUri(CHANNELURI2);
		reg2.getTags().remove("myTag");
		reg2.setBodyTemplate(WNSBODYTEMPLATE2);
		
		WindowsTemplateRegistration reg3 = (WindowsTemplateRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(new URI(CHANNELURI2), reg3.getChannelUri());
		assertEquals(1, reg3.getTags().size());
		assertEquals(WNSBODYTEMPLATE2, reg3.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		WindowsTemplateRegistration reg4 = (WindowsTemplateRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(new URI(CHANNELURI2), reg4.getChannelUri());
		assertEquals(1, reg4.getTags().size());
		assertEquals(WNSBODYTEMPLATE2, reg4.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteAppleNativeRegistration() throws URISyntaxException {
		AppleRegistration reg = new AppleRegistration(DEVICETOKEN);
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		AppleRegistration reg2 = (AppleRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(DEVICETOKEN, reg2.getDeviceToken());
		assertEquals(2, reg2.getTags().size());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setDeviceToken(DEVICETOKEN2);
		reg2.getTags().remove("myTag");
		
		AppleRegistration reg3 = (AppleRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(DEVICETOKEN2, reg3.getDeviceToken());
		assertEquals(1, reg3.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		AppleRegistration reg4 = (AppleRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(DEVICETOKEN2, reg4.getDeviceToken());
		assertEquals(1, reg4.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteAppleTemplateRegistration() throws URISyntaxException {
		AppleTemplateRegistration reg = new AppleTemplateRegistration(DEVICETOKEN, APNSBODYTEMPLATE);
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		AppleTemplateRegistration reg2 = (AppleTemplateRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(DEVICETOKEN, reg2.getDeviceToken());
		assertEquals(2, reg2.getTags().size());
		assertEquals(APNSBODYTEMPLATE, reg2.getBodyTemplate());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setDeviceToken(DEVICETOKEN2);
		reg2.getTags().remove("myTag");
		reg2.setBodyTemplate(APNSBODYTEMPLATE2);
		reg2.setExpiry(EXPIRYTEMPLATE);
		
		AppleTemplateRegistration reg3 = (AppleTemplateRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(DEVICETOKEN2, reg3.getDeviceToken());
		assertEquals(1, reg3.getTags().size());
		assertEquals(EXPIRYTEMPLATE, reg3.getExpiry());
		assertEquals(APNSBODYTEMPLATE2, reg3.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		AppleTemplateRegistration reg4 = (AppleTemplateRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(DEVICETOKEN2, reg4.getDeviceToken());
		assertEquals(1, reg4.getTags().size());
		assertEquals(EXPIRYTEMPLATE, reg3.getExpiry());
		assertEquals(APNSBODYTEMPLATE2, reg4.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteGcmNativeRegistration() throws URISyntaxException {
		GcmRegistration reg = new GcmRegistration(GCMREGID);
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		GcmRegistration reg2 = (GcmRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(GCMREGID, reg2.getGcmRegistrationId());
		assertEquals(2, reg2.getTags().size());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setGcmRegistrationId(GCMREGID2);
		reg2.getTags().remove("myTag");
		
		GcmRegistration reg3 = (GcmRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(GCMREGID2, reg3.getGcmRegistrationId());
		assertEquals(1, reg3.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		GcmRegistration reg4 = (GcmRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(GCMREGID2, reg4.getGcmRegistrationId());
		assertEquals(1, reg4.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteGcmTemplateRegistration() throws URISyntaxException {
		GcmTemplateRegistration reg = new GcmTemplateRegistration(GCMREGID, GCMBODYTEMPLATE);
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		GcmTemplateRegistration reg2 = (GcmTemplateRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(GCMREGID, reg2.getGcmRegistrationId());
		assertEquals(2, reg2.getTags().size());
		assertEquals(GCMBODYTEMPLATE, reg2.getBodyTemplate());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setGcmRegistrationId(GCMREGID2);
		reg2.getTags().remove("myTag");
		reg2.setBodyTemplate(GCMBODYTEMPLATE2);
		
		GcmTemplateRegistration reg3 = (GcmTemplateRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(GCMREGID2, reg3.getGcmRegistrationId());
		assertEquals(1, reg3.getTags().size());
		assertEquals(GCMBODYTEMPLATE2, reg3.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		GcmTemplateRegistration reg4 = (GcmTemplateRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(GCMREGID2, reg4.getGcmRegistrationId());
		assertEquals(1, reg4.getTags().size());
		assertEquals(GCMBODYTEMPLATE2, reg4.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteAdmNativeRegistration() throws URISyntaxException {
		AdmRegistration reg = new AdmRegistration(ADMREGID);
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		AdmRegistration reg2 = (AdmRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(ADMREGID, reg2.getAdmRegistrationId());
		assertEquals(2, reg2.getTags().size());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setAdmRegistrationId(GCMREGID2);
		reg2.getTags().remove("myTag");
		
		AdmRegistration reg3 = (AdmRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(ADMREGID2, reg3.getAdmRegistrationId());
		assertEquals(1, reg3.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		AdmRegistration reg4 = (AdmRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(ADMREGID2, reg4.getAdmRegistrationId());
		assertEquals(1, reg4.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteAdmTemplateRegistration() throws URISyntaxException {
		AdmTemplateRegistration reg = new AdmTemplateRegistration(ADMREGID, ADMBODYTEMPLATE);
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		AdmTemplateRegistration reg2 = (AdmTemplateRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(ADMREGID, reg2.getAdmRegistrationId());
		assertEquals(2, reg2.getTags().size());
		assertEquals(ADMBODYTEMPLATE, reg2.getBodyTemplate());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setAdmRegistrationId(ADMREGID2);
		reg2.getTags().remove("myTag");
		reg2.setBodyTemplate(ADMBODYTEMPLATE2);
		
		AdmTemplateRegistration reg3 = (AdmTemplateRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(ADMREGID2, reg3.getAdmRegistrationId());
		assertEquals(1, reg3.getTags().size());
		assertEquals(ADMBODYTEMPLATE2, reg3.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		AdmTemplateRegistration reg4 = (AdmTemplateRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(ADMREGID2, reg4.getAdmRegistrationId());
		assertEquals(1, reg4.getTags().size());
		assertEquals(ADMBODYTEMPLATE2, reg4.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testGetAllRegistration() throws URISyntaxException {
		WindowsTemplateRegistration reg = new WindowsTemplateRegistration(new URI(CHANNELURI), WNSBODYTEMPLATE);
		reg.getHeaders().put("X-WNS-Type", "wns/toast");
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		WindowsTemplateRegistration reg2 = (WindowsTemplateRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		
		WindowsRegistration reg3 = new WindowsRegistration(new URI(CHANNELURI2));
		reg3.getTags().add("myTag");
		
		WindowsRegistration reg4 = (WindowsRegistration) hub.createRegistration(reg3);
		assertNotNull(reg4);
		
		CollectionResult allRegs = hub.getRegistrations();
		assertNotNull(allRegs);
		assertNotNull(allRegs.getRegistrations());
		assertNull(allRegs.getContinuationToken());
		assertEquals(2, allRegs.getRegistrations().size());
		
		allRegs = hub.getRegistrationsByTag("myTag");
		assertNotNull(allRegs);
		assertNotNull(allRegs.getRegistrations());
		assertNull(allRegs.getContinuationToken());
		assertEquals(2, allRegs.getRegistrations().size());
		
		allRegs = hub.getRegistrationsByTag("myOtherTag");
		assertNotNull(allRegs);
		assertNotNull(allRegs.getRegistrations());
		assertNull(allRegs.getContinuationToken());
		assertEquals(1, allRegs.getRegistrations().size());
		
		allRegs = hub.getRegistrationsByChannel(CHANNELURI);
		assertNotNull(allRegs);
		assertNotNull(allRegs.getRegistrations());
		assertNull(allRegs.getContinuationToken());
		assertEquals(1, allRegs.getRegistrations().size());
		
		
		hub.deleteRegistration(reg2.getRegistrationId());
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testGetAllRegistrationTopANdContinuation() throws URISyntaxException {
		WindowsTemplateRegistration reg = new WindowsTemplateRegistration(new URI(CHANNELURI), WNSBODYTEMPLATE);
		reg.getHeaders().put("X-WNS-Type", "wns/toast");
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		WindowsTemplateRegistration reg2 = (WindowsTemplateRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		
		WindowsRegistration reg3 = new WindowsRegistration(new URI(CHANNELURI2));
		reg3.getTags().add("myTag");
		
		WindowsRegistration reg4 = (WindowsRegistration) hub.createRegistration(reg3);
		assertNotNull(reg4);
		
		CollectionResult allRegs = hub.getRegistrations(1, null);
		assertNotNull(allRegs);
		assertNotNull(allRegs.getRegistrations());
		assertNotNull(allRegs.getContinuationToken());
		assertEquals(1, allRegs.getRegistrations().size());
		
		allRegs = hub.getRegistrations(1, allRegs.getContinuationToken());
		assertNotNull(allRegs);
		assertNotNull(allRegs.getRegistrations());
		assertNull(allRegs.getContinuationToken());
		assertEquals(1, allRegs.getRegistrations().size());
		
		
		hub.deleteRegistration(reg2.getRegistrationId());
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteMpnsNativeRegistration() throws URISyntaxException {
		MpnsRegistration reg = new MpnsRegistration(new URI(MPNSCHANNELURI));
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		MpnsRegistration reg2 = (MpnsRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(new URI(MPNSCHANNELURI), reg2.getChannelUri());
		assertEquals(2, reg2.getTags().size());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setChannelUri(MPNSCHANNELURI2);
		reg2.getTags().remove("myTag");
		
		MpnsRegistration reg3 = (MpnsRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(new URI(MPNSCHANNELURI2), reg3.getChannelUri());
		assertEquals(1, reg3.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		MpnsRegistration reg4 = (MpnsRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(new URI(MPNSCHANNELURI2), reg4.getChannelUri());
		assertEquals(1, reg4.getTags().size());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	
	@Test
	public void testCreateAndDeleteMpnsTemplateRegistration() throws URISyntaxException {
		MpnsTemplateRegistration reg = new MpnsTemplateRegistration(new URI(MPNSCHANNELURI), MPNSBODYTEMPLATE);
		reg.getHeaders().put("X-WindowsPhone-Target", "toast");
		reg.getHeaders().put("X-NotificationClass", "2");
		reg.getTags().add("myTag");
		reg.getTags().add("myOtherTag");
		
		MpnsTemplateRegistration reg2 = (MpnsTemplateRegistration) hub.createRegistration(reg);
		assertNotNull(reg2);
		assertEquals(new URI(MPNSCHANNELURI), reg2.getChannelUri());
		assertEquals(2, reg2.getTags().size());
		assertEquals(MPNSBODYTEMPLATE, reg2.getBodyTemplate());
		assertEquals(2, reg2.getHeaders().size());
		assertNotNull(reg2.getRegistrationId());
		assertNotNull(reg2.getEtag());
		
		reg2.setChannelUri(MPNSCHANNELURI2);
		reg2.getTags().remove("myTag");
		reg2.setBodyTemplate(MPNSBODYTEMPLATE2);
		
		MpnsTemplateRegistration reg3 = (MpnsTemplateRegistration) hub.updateRegistration(reg2);
		assertNotNull(reg3);
		assertEquals(new URI(MPNSCHANNELURI2), reg3.getChannelUri());
		assertEquals(1, reg3.getTags().size());
		assertEquals(MPNSBODYTEMPLATE2, reg3.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg3.getRegistrationId());
		assertNotSame(reg2.getEtag(), reg3.getEtag());
		
		MpnsTemplateRegistration reg4 = (MpnsTemplateRegistration) hub.getRegistration(reg3.getRegistrationId());
		assertNotNull(reg4);
		assertEquals(new URI(MPNSCHANNELURI2), reg4.getChannelUri());
		assertEquals(1, reg4.getTags().size());
		assertEquals(MPNSBODYTEMPLATE2, reg4.getBodyTemplate());
		assertEquals(reg2.getRegistrationId(), reg4.getRegistrationId());
		assertEquals(reg3.getEtag(), reg4.getEtag());
		
		hub.deleteRegistration(reg4.getRegistrationId());
	}
	

	@Test
	public void testSendWindowsNotification() {
		Notification n = Notification.createWindowsNotification(WNSBODYTEMPLATE);
		
		hub.sendNotification(n);
		
		Set<String> tags = new HashSet<String>();
		tags.add("boo");
		tags.add("foo");
		
		hub.sendNotification(n, tags);
		
		hub.sendNotification(n, "foo && ! bar");
	}
	
	@Test
	public void testSendAppleNotification() {
		Notification n = Notification.createAppleNotifiation(APNSBODYTEMPLATE);
		
		hub.sendNotification(n);
		
		Set<String> tags = new HashSet<String>();
		tags.add("boo");
		tags.add("foo");
		
		hub.sendNotification(n, tags);
		
		hub.sendNotification(n, "foo && ! bar");
	}
	
	@Test
	public void testSendGcmNotification() {
		Notification n = Notification.createGcmNotifiation(GCMBODYTEMPLATE);
		
		hub.sendNotification(n);
		
		Set<String> tags = new HashSet<String>();
		tags.add("boo");
		tags.add("foo");
		
		hub.sendNotification(n, tags);
		
		hub.sendNotification(n, "foo && ! bar");
	}
	
	@Test
	public void testSendAdmNotification() {
		Notification n = Notification.createAdmNotifiation(ADMBODYTEMPLATE);
		
		hub.sendNotification(n);
		
		Set<String> tags = new HashSet<String>();
		tags.add("boo");
		tags.add("foo");
		
		hub.sendNotification(n, tags);
		
		hub.sendNotification(n, "foo && ! bar");
	}
	
	@Test
	public void testSendMpnsNotification() {
		Notification n = Notification.createMpnsNotifiation(MPNSBODYTEMPLATE);
		
		hub.sendNotification(n);
		
		Set<String> tags = new HashSet<String>();
		tags.add("boo");
		tags.add("foo");
		
		hub.sendNotification(n, tags);
		
		hub.sendNotification(n, "foo && ! bar");
	}
	
	@Test
	public void testSendTemplateNotification() {
		Map<String, String> prop =  new HashMap<String, String>();
		prop.put("prop1", "v1");
		prop.put("prop2", "v2");
		Notification n = Notification.createTemplateNotification(prop);
		
		hub.sendNotification(n);
		
		Set<String> tags = new HashSet<String>();
		tags.add("boo");
		tags.add("foo");
		
		hub.sendNotification(n, tags);
		
		hub.sendNotification(n, "foo && ! bar");
	}

}
