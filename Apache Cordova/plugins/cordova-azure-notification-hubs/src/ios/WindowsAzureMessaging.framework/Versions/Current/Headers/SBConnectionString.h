//----------------------------------------------------------------
//  Copyright (c) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------------

#import <Foundation/Foundation.h>

@interface SBConnectionString : NSObject

+ (NSString*) stringWithEndpoint:(NSURL*)endpoint issuer:(NSString*) issuer issuerSecret:(NSString*)secret;

+ (NSString*) stringWithEndpoint:(NSURL*)endpoint fullAccessSecret:(NSString*)fullAccessSecret;

+ (NSString*) stringWithEndpoint:(NSURL*)endpoint listenAccessSecret:(NSString*)listenAccessSecret;

+ (NSString*) stringWithEndpoint:(NSURL*)endpoint sharedAccessKeyName:(NSString*)keyName accessSecret:(NSString*)secret;

@end
