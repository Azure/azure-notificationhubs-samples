//
//  AppDelegate.swift
//  NHPushDemo
//
//  Created by Mimi Xu on 1/26/16.
//  Copyright © 2016 msft. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    var newDeviceToken: NSData?


    func application(application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [NSObject : AnyObject]?) -> Bool {
            application.registerUserNotificationSettings(
                UIUserNotificationSettings(forTypes: [.Alert, .Badge, .Sound],
                    categories: nil))
            application.registerForRemoteNotifications()
            return true
    }
    
    func application(application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData) {
            NSLog("didRegister")
            
            //GOT DEVICE TOKEN
            newDeviceToken = deviceToken
            NSLog("Yay device token obtained")
            
            
    }
    
    func application(application: UIApplication,
    didFailToRegisterForRemoteNotificationsWithError error: NSError) {
        NSLog("Failed to register for remote notifications: \n%@", error.description)
    }
    
    // received notification
    func application(application: UIApplication,
        didReceiveRemoteNotification userInfo: [NSObject : AnyObject]) {
            
            NSLog("%@", userInfo)
            
            let apsNotification = userInfo["aps"] as! NSDictionary
            let apsString       = apsNotification["alert"] as! String
            
            let alert = UIAlertController(title: "Alert", message:apsString, preferredStyle: .Alert)
            let okAction = UIAlertAction(title: "OK", style: .Default) { _ in
                NSLog("OK")
            }
            let cancelAction = UIAlertAction(title: "Cancel", style: .Default) { _ in
                NSLog("Cancel")
            }
            
            alert.addAction(okAction)
            alert.addAction(cancelAction)
            
            var currentViewController = UIApplication.sharedApplication().delegate?.window??.rootViewController
            while currentViewController?.presentedViewController != nil {
                currentViewController = currentViewController?.presentedViewController
            }
            
            currentViewController?.presentViewController(alert, animated: true){}
            
    }

    func applicationWillResignActive(application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(application: UIApplication) {
        // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}

