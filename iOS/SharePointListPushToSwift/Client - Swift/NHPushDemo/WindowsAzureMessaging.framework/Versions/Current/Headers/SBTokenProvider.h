//----------------------------------------------------------------
//  Copyright (c) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------------

@interface SBTokenProvider : NSObject{

@private
    NSString* _sharedAccessKey;
    NSString* _sharedAccessKeyName ;
    NSString* _sharedSecret;
    NSString* _sharedSecretIssurer;
    NSURL* _stsHostName;
    NSURL* _serviceEndPoint;
}

@property (nonatomic) NSInteger timeToExpireinMins;

- (SBTokenProvider*) initWithConnectionDictinary: (NSDictionary*) connectionDictionary;

- (void) setTokenWithRequest:(NSMutableURLRequest*)request completion:(void (^)(NSError*))completion;
- (BOOL) setTokenWithRequest:(NSMutableURLRequest*)request error:(NSError**)error;

@end

