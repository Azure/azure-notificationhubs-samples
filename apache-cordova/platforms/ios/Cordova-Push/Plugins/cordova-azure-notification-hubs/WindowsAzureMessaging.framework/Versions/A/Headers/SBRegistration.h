//----------------------------------------------------------------
//  Copyright (c) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------------

#import <Foundation/Foundation.h>

@interface SBRegistration : NSObject

@property (copy, nonatomic) NSString* ETag;
@property (copy, nonatomic) NSDate* expiresAt;
@property (copy, nonatomic) NSSet* tags;
@property (copy, nonatomic) NSString* registrationId;
@property (copy, nonatomic) NSString* deviceToken;

+ (NSString*) Name;

+ (NSString*) payloadWithDeviceToken:(NSString*)deviceToken tags:(NSSet*)tags;

@end



