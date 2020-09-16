#import "AppDelegate.h"
#import "GeneratedPluginRegistrant.h"
#import <Flutter/Flutter.h>
#import <WindowsAzureMessaging/WindowsAzureMessaging.h>

@interface AppDelegate() <MSNotificationHubDelegate>
    @property (nonatomic) FlutterEventSink eventSink;
@end

@implementation AppDelegate

@synthesize eventSink;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [GeneratedPluginRegistrant registerWithRegistry:self];
    
    FlutterViewController *controller = (FlutterViewController*)self.window.rootViewController;
    
    FlutterMethodChannel *notificationHubChannel = [FlutterMethodChannel methodChannelWithName:@"azure.microsoft.com/nhub" binaryMessenger:controller.binaryMessenger];
    
    // Read from DevSettings.plist
    NSString *path = [[NSBundle mainBundle] pathForResource:@"DevSettings" ofType:@"plist"];
    NSDictionary *configValues = [NSDictionary dictionaryWithContentsOfFile:path];
    
    NSString *connectionString = [configValues objectForKey:@"CONNECTION_STRING"];
    NSString *hubName = [configValues objectForKey:@"HUB_NAME"];
    
    [MSNotificationHub setDelegate:self];
    [MSNotificationHub startWithConnectionString:connectionString hubName:hubName];
    
    __weak typeof(self) weakSelf = self;
    
    [notificationHubChannel setMethodCallHandler:^(FlutterMethodCall *call, FlutterResult result) {
       
        // Handle each method
        if ([@"addTag" isEqualToString:call.method]) {
            NSString *tagName = call.arguments;
            
            BOOL addTagResult = [weakSelf addTag:tagName];
            result(@(addTagResult));
        } if ([@"clearTags" isEqualToString:call.method]) {
            [weakSelf clearTags];
            result(nil);
        } if ([@"removeTag" isEqualToString:call.method]) {
            NSString *tagName = call.arguments;
            
            BOOL removeTagResult = [weakSelf removeTag:tagName];
            result(@(removeTagResult));
        } if ([@"getTags" isEqualToString:call.method]) {
            NSArray *tags = [weakSelf getTags];
            result(tags);
        } if ([@"getUserId" isEqualToString:call.method]) {
            NSString *userId = [weakSelf getUserId];
            result(userId);
        } if ([@"setUserId" isEqualToString:call.method]) {
            NSString *userId = call.arguments;
            
            [weakSelf setUserId:userId];
            result(nil);
        } if ([@"getPushChannel" isEqualToString:call.method]) {
            NSString *pushChannel = [weakSelf getPushChannel];
            result(pushChannel);
        } if ([@"getInstallationId" isEqualToString:call.method]) {
            NSString *installationId = [weakSelf getInstallationId];
            result(installationId);
        } else {
            result(FlutterMethodNotImplemented);
        }
        
    }];
    
    FlutterEventChannel *notificationHubEventChannel = [FlutterEventChannel eventChannelWithName:@"azure.microsoft.com/nhubevents" binaryMessenger:controller.binaryMessenger];
    [notificationHubEventChannel setStreamHandler:self];
    
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

#pragma mark MSNotificationHub

- (BOOL)addTag:(NSString *)tagName {
    return [MSNotificationHub addTag:tagName];
}

- (BOOL)removeTag:(NSString *)tagName {
    return [MSNotificationHub removeTag:tagName];
}

- (void)clearTags {
    [MSNotificationHub clearTags];
}

- (NSArray *)getTags {
    return [MSNotificationHub getTags];
}

- (NSString *)getUserId {
    return [MSNotificationHub getUserId];
}

- (void)setUserId:(NSString *)userId {
    [MSNotificationHub setUserId:userId];
}

- (NSString *)getPushChannel {
    return [MSNotificationHub getPushChannel];
}

- (NSString *)getInstallationId {
    return [MSNotificationHub getInstallationId];
}

#pragma mark FlutterStreamHandler

- (FlutterError *)onListenWithArguments:(id)arguments eventSink:(FlutterEventSink)events {
    eventSink = events;
    return nil;
}

- (FlutterError *)onCancelWithArguments:(id)arguments {
    eventSink = nil;
    return nil;
}

#pragma mark MSNotificationHubDelegate

- (void)notificationHub:(MSNotificationHub *)notificationHub didReceivePushNotification:(MSNotificationHubMessage *)message {
    
    if (!eventSink) {
        return;
    }
    
    eventSink(message.userInfo);
}

@end
