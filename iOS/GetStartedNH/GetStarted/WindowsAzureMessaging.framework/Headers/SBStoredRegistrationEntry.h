//----------------------------------------------------------------
//  Copyright (c) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------------


#import <Foundation/Foundation.h>

@interface StoredRegistrationEntry : NSObject

@property (copy, nonatomic) NSString* RegistrationName;
@property (copy, nonatomic) NSString* RegistrationId;
@property (copy, nonatomic) NSString* ETag;

- (StoredRegistrationEntry*) initWithString:(NSString*) string;
- (NSString*) toString;
@end
