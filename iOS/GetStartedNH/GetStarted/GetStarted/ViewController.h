//
//  ViewController.h
//  GetStarted
//
//  Created by Wesley McSwain on 10/13/15.
//  Copyright © 2015 Wesley McSwain. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <CommonCrypto/CommonHMAC.h>
#import "HubInfo.h"


@interface ViewController : UIViewController<UITextFieldDelegate, NSXMLParserDelegate>
{
    NSXMLParser *xmlParser;
}


@property (weak, nonatomic) IBOutlet UITextField *notificationMessage;
@property (weak, nonatomic) IBOutlet UILabel *sendResults;

@property (copy, nonatomic) NSString *statusResult;
@property (copy, nonatomic) NSString *currentElement;


@end

