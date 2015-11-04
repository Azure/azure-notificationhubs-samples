//
//  ViewController.m
//  GetStarted
//
//  Created by Wesley McSwain on 10/13/15.
//  Copyright © 2015 Wesley McSwain. All rights reserved.
//

#import "ViewController.h"



@implementation ViewController



NSString *HubEndpoint;
NSString *HubSasKeyName;
NSString *HubSasKeyValue;

-(void)ParseConnectionString
{
    NSArray *parts = [HUBFULLACCESS componentsSeparatedByString:@";"];
    NSString *part;
    
    if ([parts count] != 3)
    {
        NSException* parseException = [NSException exceptionWithName:@"ConnectionStringParseException"
                                                              reason:@"Invalid full shared access connection string" userInfo:nil];
        
        @throw parseException;
    }
    
    for (part in parts)
    {
        if ([part hasPrefix:@"Endpoint"])
        {
            HubEndpoint = [NSString stringWithFormat:@"https%@",[part substringFromIndex:11]];
        }
        else if ([part hasPrefix:@"SharedAccessKeyName"])
        {
            HubSasKeyName = [part substringFromIndex:20];
        }
        else if ([part hasPrefix:@"SharedAccessKey"])
        {
            HubSasKeyValue = [part substringFromIndex:16];
        }
    }
}


-(NSString*) generateSasToken:(NSString*)uri
{
    NSString *targetUri;
    NSString* utf8LowercasedUri = NULL;
    NSString *signature = NULL;
    NSString *token = NULL;
    
    @try
    {
        // Add expiration
        uri = [uri lowercaseString];
        utf8LowercasedUri = [self CF_URLEncodedString:uri];
        targetUri = [utf8LowercasedUri lowercaseString];
        NSTimeInterval expiresOnDate = [[NSDate date] timeIntervalSince1970];
        int expiresInMins = 60; // 1 hour
        expiresOnDate += expiresInMins * 60;
        UInt64 expires = trunc(expiresOnDate);
        NSString* toSign = [NSString stringWithFormat:@"%@\n%qu", targetUri, expires];
        
        // Get an hmac_sha1 Mac instance and initialize with the signing key
        const char *cKey  = [HubSasKeyValue cStringUsingEncoding:NSUTF8StringEncoding];
        const char *cData = [toSign cStringUsingEncoding:NSUTF8StringEncoding];
        unsigned char cHMAC[CC_SHA256_DIGEST_LENGTH];
        CCHmac(kCCHmacAlgSHA256, cKey, strlen(cKey), cData, strlen(cData), cHMAC);
        NSData *rawHmac = [[NSData alloc] initWithBytes:cHMAC length:sizeof(cHMAC)];
        signature = [self CF_URLEncodedString:[rawHmac base64EncodedStringWithOptions:0]];
        
        // Construct authorization token string
        token = [NSString stringWithFormat:@"SharedAccessSignature sig=%@&se=%qu&skn=%@&sr=%@",
                 signature, expires, HubSasKeyName, targetUri];
    }
    @catch (NSException *exception)
    {
        [self MessageBox:@"Exception Generating SaS Token" message:[exception reason]];
    }
    @finally
    {
        if (utf8LowercasedUri != NULL)
            CFRelease((CFStringRef)utf8LowercasedUri);
        if (signature != NULL)
            CFRelease((CFStringRef)signature);
    }
    
    return token;
}

- (IBAction)SendNotificationMessage:(id)sender
{
    self.sendResults.text = @"";
    [self SendNotificationRESTAPI];
}

- (void)SendNotificationRESTAPI
{
    NSURLSession* session = [NSURLSession
                             sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                             delegate:nil delegateQueue:nil];
    
    // Apple Notification format of the notification message
    NSString *json = [NSString stringWithFormat:@"{\"aps\":{\"alert\":\"%@\"}}",
                      self.notificationMessage.text];
    
    // Construct the message's REST endpoint
    NSURL* url = [NSURL URLWithString:[NSString stringWithFormat:@"%@%@/messages/%@", HubEndpoint,
                                       HUBNAME, API_VERSION]];
    
    // Generate the token to be used in the authorization header
    NSString* authorizationToken = [self generateSasToken:[url absoluteString]];
    
    //Create the request to add the APNs notification message to the hub
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json;charset=utf-8" forHTTPHeaderField:@"Content-Type"];
    
    // Signify Apple notification format
    [request setValue:@"apple" forHTTPHeaderField:@"ServiceBusNotification-Format"];
    
    //Authenticate the notification message POST request with the SaS token
    [request setValue:authorizationToken forHTTPHeaderField:@"Authorization"];
    
    //Add the notification message body
    [request setHTTPBody:[json dataUsingEncoding:NSUTF8StringEncoding]];
    
    // Send the REST request
    NSURLSessionDataTask* dataTask = [session dataTaskWithRequest:request
                                                completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
                                      {
                                          NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*) response;
                                          if (error || (httpResponse.statusCode != 200 && httpResponse.statusCode != 201))
                                          {
                                              NSLog(@"\nError status: %d\nError: %@", httpResponse.statusCode, error);
                                          }
                                          if (data != NULL)
                                          {
                                              xmlParser = [[NSXMLParser alloc] initWithData:data];
                                              [xmlParser setDelegate:self];
                                              [xmlParser parse];
                                          }
                                      }];
    [dataTask resume];
}



//===[ Implement UITextFieldDelegate methods ]===

-(BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [textField resignFirstResponder];
    return YES;
}


//===[ Implement NSXMLParserDelegate methods ]===

-(void)parserDidStartDocument:(NSXMLParser *)parser
{
    self.statusResult = @"";
}

-(void)parser:(NSXMLParser *)parser didStartElement:(NSString *)elementName
 namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName
   attributes:(NSDictionary *)attributeDict
{
    NSString * element = [elementName lowercaseString];
    NSLog(@"*** New element parsed : %@ ***",element);
    
    if ([element isEqualToString:@"code"] | [element isEqualToString:@"detail"])
    {
        self.currentElement = element;
    }
}

-(void) parser:(NSXMLParser *)parser foundCharacters:(NSString *)parsedString
{
    self.statusResult = [self.statusResult stringByAppendingString:
                         [NSString stringWithFormat:@"%@ : %@\n", self.currentElement, parsedString]];
}

-(void)parserDidEndDocument:(NSXMLParser *)parser
{
    // Set the status label text on the UI thread
    dispatch_async(dispatch_get_main_queue(),
                   ^{
                       [self.sendResults setText:self.statusResult];
                   });
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    [self ParseConnectionString];
}

-(NSString *)CF_URLEncodedString:(NSString *)inputString
{
    return (__bridge NSString *)CFURLCreateStringByAddingPercentEscapes(NULL, (CFStringRef)inputString,
                                                                        NULL, (CFStringRef)@"!*'();:@&=+$,/?%#[]", kCFStringEncodingUTF8);
}

-(void)MessageBox:(NSString *)title message:(NSString *)messageText
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageText delegate:self
                                          cancelButtonTitle:@"OK" otherButtonTitles: nil];
    [alert show];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
