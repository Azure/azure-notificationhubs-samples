package com.windowsazure.messaging;

import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;

/**
 * 
 * Class implementing the INotificationHub interface.
 *
 */
public class NotificationHub implements INotificationHub {

	private static final String APIVERSION = "?api-version=2013-10";
	private static final String CONTENT_LOCATION_HEADER = "Location";
	private String endpoint;
	private String hubPath;
	private String SasKeyName;
	private String SasKeyValue;

	private HttpClient httpClient;

	// TODO http mockito unit tests

	public NotificationHub(String connectionString, String hubPath) {
		this.httpClient = HttpClients.createDefault();
		this.hubPath = hubPath;

		String[] parts = connectionString.split(";");
		if (parts.length != 3)
			throw new RuntimeException("Error parsing connection string: "
					+ connectionString);

		for (int i = 0; i < parts.length; i++) {
			if (parts[i].startsWith("Endpoint")) {
				this.endpoint = "https" + parts[i].substring(11);
			} else if (parts[i].startsWith("SharedAccessKeyName")) {
				this.SasKeyName = parts[i].substring(20);
			} else if (parts[i].startsWith("SharedAccessKey")) {
				this.SasKeyValue = parts[i].substring(16);
			}
		}
	}

	public void setHttpClient(HttpClient httpClient) {
		this.httpClient = httpClient;
	}

	public HttpClient getHttpClient() {
		return this.httpClient;
	}

	private String generateSasToken(URI uri) {
		String targetUri;
		try {
			targetUri = URLEncoder
					.encode(uri.toString().toLowerCase(), "UTF-8")
					.toLowerCase();

			long expiresOnDate = System.currentTimeMillis();
			int expiresInMins = 60; // 1 hour
			expiresOnDate += expiresInMins * 60 * 1000;
			long expires = expiresOnDate / 1000;
			String toSign = targetUri + "\n" + expires;

			// Get an hmac_sha1 key from the raw key bytes
			byte[] keyBytes = SasKeyValue.getBytes("UTF-8");
			SecretKeySpec signingKey = new SecretKeySpec(keyBytes, "HmacSHA256");

			// Get an hmac_sha1 Mac instance and initialize with the signing key
			Mac mac = Mac.getInstance("HmacSHA256");
			mac.init(signingKey);

			// Compute the hmac on input data bytes
			byte[] rawHmac = mac.doFinal(toSign.getBytes("UTF-8"));

			// Convert raw bytes to Hex
			String signature = URLEncoder.encode(
					Base64.encodeBase64String(rawHmac), "UTF-8");

			// construct authorization string
			String token = "SharedAccessSignature sr=" + targetUri + "&sig="
					+ signature + "&se=" + expires + "&skn=" + SasKeyName;
			return token;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public Registration createRegistration(Registration registration) {
		HttpPost post = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/registrations"
					+ APIVERSION);
			post = new HttpPost(uri);
			post.setHeader("Authorization", generateSasToken(uri));

			StringEntity entity = new StringEntity(registration.getXml(),
					ContentType.APPLICATION_ATOM_XML);
			entity.setContentEncoding("utf-8");
			post.setEntity(entity);
			HttpResponse response = httpClient.execute(post);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException(getErrorString(response));
			}

			return Registration.parse(response.getEntity().getContent());
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (post != null)
				post.releaseConnection();
		}
	}

	private String getErrorString(HttpResponse response)
			throws IllegalStateException, IOException {
		StringWriter writer = new StringWriter();
		IOUtils.copy(response.getEntity().getContent(), writer, "UTF-8");
		String body = writer.toString();
		return "Error: " + response.getStatusLine() + " - " + body;
	}

	@Override
	public String createRegistrationId() {
		HttpPost post = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/registrationids"
					+ APIVERSION);
			post = new HttpPost(uri);
			post.setHeader("Authorization", generateSasToken(uri));

			HttpResponse response = httpClient.execute(post);

			if (response.getStatusLine().getStatusCode() != 201) {
				throw new RuntimeException(getErrorString(response));
			}

			String location = response.getFirstHeader(CONTENT_LOCATION_HEADER).getValue();
			
			Pattern extractId = Pattern.compile("(\\S+)/registrationids/([^?]+).*");
			Matcher m = extractId.matcher(location);
			m.matches();
			String id = m.group(2);
			return id;
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (post != null)
				post.releaseConnection();
		}
	}

	@Override
	public Registration updateRegistration(Registration registration) {
		HttpPut put = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/registrations/"
					+ registration.getRegistrationId() + APIVERSION);
			put = new HttpPut(uri);
			put.setHeader("Authorization", generateSasToken(uri));
			put.setHeader("If-Match", registration.getEtag() == null ? "*"
					: "W/\"" + registration.getEtag() + "\"");

			put.setEntity(new StringEntity(registration.getXml(),
					ContentType.APPLICATION_ATOM_XML));
			HttpResponse response = httpClient.execute(put);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException(getErrorString(response));
			}

			return Registration.parse(response.getEntity().getContent());
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (put != null)
				put.releaseConnection();
		}
	}
	
	@Override
	public Registration upsertRegistration(Registration registration) {
		HttpPut put = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/registrations/"
					+ registration.getRegistrationId() + APIVERSION);
			put = new HttpPut(uri);
			put.setHeader("Authorization", generateSasToken(uri));

			put.setEntity(new StringEntity(registration.getXml(),
					ContentType.APPLICATION_ATOM_XML));
			HttpResponse response = httpClient.execute(put);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException(getErrorString(response));
			}

			return Registration.parse(response.getEntity().getContent());
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (put != null)
				put.releaseConnection();
		}
	}

	@Override
	public void deleteRegistration(Registration registration) {
		HttpDelete delete = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/registrations/"
					+ registration.getRegistrationId() + APIVERSION);
			delete = new HttpDelete(uri);
			delete.setHeader("Authorization", generateSasToken(uri));
			delete.setHeader("If-Match", registration.getEtag() == null ? "*"
					: "W/\"" + registration.getEtag() + "\"");

			HttpResponse response = httpClient.execute(delete);

			if (response.getStatusLine().getStatusCode() != 200 && 
					response.getStatusLine().getStatusCode() != 404)
				throw new RuntimeException(getErrorString(response));
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (delete != null)
				delete.releaseConnection();
		}
	}

	@Override
	public void deleteRegistration(String registrationId) {
		HttpDelete delete = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/registrations/"
					+ registrationId + APIVERSION);
			delete = new HttpDelete(uri);
			delete.setHeader("Authorization", generateSasToken(uri));
			delete.setHeader("If-Match", "*");

			HttpResponse response = httpClient.execute(delete);

			if (response.getStatusLine().getStatusCode() != 200 && 
					response.getStatusLine().getStatusCode() != 404)
				throw new RuntimeException(getErrorString(response));
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (delete != null)
				delete.releaseConnection();
		}
	}

	@Override
	public Registration getRegistration(String registrationId) {
		HttpGet get = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/registrations/"
					+ registrationId + APIVERSION);
			get = new HttpGet(uri);
			get.setHeader("Authorization", generateSasToken(uri));

			HttpResponse response = httpClient.execute(get);

			if (response.getStatusLine().getStatusCode() != 200)
				throw new RuntimeException(getErrorString(response));

			return Registration.parse(response.getEntity().getContent());
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (get != null)
				get.releaseConnection();
		}
	}

	@Override
	public CollectionResult getRegistrations(int top, String continuationToken) {
		String queryUri = endpoint + hubPath + "/registrations" + APIVERSION
				+ getQueryString(top, continuationToken);
		return retrieveRegistrationCollection(queryUri);
	}

	private CollectionResult retrieveRegistrationCollection(String queryUri) {
		HttpGet get = null;
		try {
			URI uri = new URI(queryUri);
			get = new HttpGet(uri);
			get.setHeader("Authorization", generateSasToken(uri));

			HttpResponse response = httpClient.execute(get);

			if (response.getStatusLine().getStatusCode() != 200)
				throw new RuntimeException(getErrorString(response));

			CollectionResult result = Registration.parseRegistrations(response
					.getEntity().getContent());
			Header contTokenHeader = response
					.getFirstHeader("X-MS-ContinuationToken");
			if (contTokenHeader != null) {
				result.setContinuationToken(contTokenHeader.getValue());
			}
			return result;
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (get != null)
				get.releaseConnection();
		}
	}

	private String getQueryString(int top, String continuationToken) {
		StringBuffer buf = new StringBuffer();
		if (top > 0) {
			buf.append("&$top=" + top);
		}
		if (continuationToken != null) {
			buf.append("&ContinuationToken=" + continuationToken);
		}
		return buf.toString();
	}

	@Override
	public CollectionResult getRegistrationsByTag(String tag, int top,
			String continuationToken) {
		String queryUri = endpoint + hubPath + "/tags/" + tag
				+ "/registrations" + APIVERSION
				+ getQueryString(top, continuationToken);
		return retrieveRegistrationCollection(queryUri);
	}

	@Override
	public CollectionResult getRegistrationsByChannel(String channel, int top,
			String continuationToken) {
		String queryUri = null;
		try {
			String channelQuery = URLEncoder.encode("ChannelUri eq '" + channel
					+ "'", "UTF-8");
			queryUri = endpoint + hubPath + "/registrations" + APIVERSION
					+ "&$filter=" + channelQuery
					+ getQueryString(top, continuationToken);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
		return retrieveRegistrationCollection(queryUri);
	}

	@Override
	public void sendNotification(Notification notification) {
		sendNotification(notification, "");
	}

	@Override
	public void sendNotification(Notification notification, Set<String> tags) {
		if (tags.isEmpty())
			throw new IllegalArgumentException(
					"tags has to contain at least an element");

		StringBuffer exp = new StringBuffer();
		for (Iterator<String> iterator = tags.iterator(); iterator.hasNext();) {
			exp.append(iterator.next());
			if (iterator.hasNext())
				exp.append(" || ");
		}

		sendNotification(notification, exp.toString());
	}

	@Override
	public void sendNotification(Notification notification, String tagExpression) {
		HttpPost post = null;
		try {
			URI uri = new URI(endpoint + hubPath + "/messages" + APIVERSION);
			post = new HttpPost(uri);
			post.setHeader("Authorization", generateSasToken(uri));

			if (tagExpression != null && !"".equals(tagExpression)) {
				post.setHeader("ServiceBusNotification-Tags", tagExpression);
			}

			for (String header : notification.getHeaders().keySet()) {
				post.setHeader(header, notification.getHeaders().get(header));
			}

			post.setEntity(new StringEntity(notification.getBody()));
			HttpResponse response = httpClient.execute(post);

			if (response.getStatusLine().getStatusCode() != 201) {
				String msg = "";
				if (response.getEntity() != null
						&& response.getEntity().getContent() != null) {
					msg = IOUtils.toString(response.getEntity().getContent());
				}
				throw new RuntimeException("Error: " + response.getStatusLine()
						+ " body: " + msg);
			}

		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (post != null)
				post.releaseConnection();
		}
	}

	@Override
	public CollectionResult getRegistrations() {
		return getRegistrations(0, null);
	}

	@Override
	public CollectionResult getRegistrationsByTag(String tag) {
		return getRegistrationsByTag(tag, 0, null);
	}

	@Override
	public CollectionResult getRegistrationsByChannel(String channel) {
		return getRegistrationsByChannel(channel, 0, null);
	}
}
