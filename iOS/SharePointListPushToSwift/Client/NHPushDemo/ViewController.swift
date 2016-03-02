//
//  ViewController.swift
//  NHPushDemo
//
//  Created by Mimi Xu on 1/26/16.
//  Copyright © 2016 msft. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var registerAzure: UISwitch!
    @IBOutlet weak var registerCompute: UISwitch!
    @IBOutlet weak var registerWebMobile: UISwitch!
    @IBOutlet weak var registerDataStorage: UISwitch!
    @IBOutlet weak var registerAnalytics: UISwitch!
    @IBOutlet weak var registerIoT: UISwitch!
    @IBOutlet weak var registerNetworking: UISwitch!
    @IBOutlet weak var registerMediaCDN: UISwitch!
    @IBOutlet weak var registerHybridIntegration: UISwitch!
    @IBOutlet weak var registerIdentityAccessManagement: UISwitch!
    @IBOutlet weak var registerDeveloperServices: UISwitch!
    @IBOutlet weak var registerManagementSecurity: UISwitch!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func registerNH(sender: UISwitch) {
        //TAGS
        let categories = NSMutableSet()
        if (registerAzure.on) {
            categories.addObject("Azure" as AnyObject)
        }
        if (registerCompute.on){
            categories.addObject("Compute" as AnyObject)
        }
        if (registerWebMobile.on) {
            categories.addObject("WebMobile" as AnyObject)
        }
        if (registerDataStorage.on) {
            categories.addObject("DataStorage" as AnyObject)
        }
        if (registerAnalytics.on) {
            categories.addObject("Analytics" as AnyObject)
        }
        if (registerIoT.on) {
            categories.addObject("InternetofThings" as AnyObject)
        }
        if (registerNetworking.on) {
            categories.addObject("Networking" as AnyObject)
        }
        if (registerMediaCDN.on) {
            categories.addObject("MediaCDN" as AnyObject)
        }
        if (registerHybridIntegration.on) {
            categories.addObject("HybridIntegration" as AnyObject)
        }
        if (registerIdentityAccessManagement.on) {
            categories.addObject("IdentityAccessManagement" as AnyObject)
        }
        if (registerDeveloperServices.on) {
            categories.addObject("DeveloperServices" as AnyObject)
        }
        if (registerManagementSecurity.on) {
            categories.addObject("ManagementSecurity" as AnyObject)
        }
        
        //GET DEVICE TOKEN
        let delegate = UIApplication.sharedApplication().delegate as! AppDelegate
        let deviceToken = delegate.newDeviceToken
        
        
        //REGISTER DEVICE TOKEN WITH TAGS:CATEGORIES
        let hub = SBNotificationHub.init(connectionString: "{notification hub listening string}", notificationHubPath: "{notification hub name}")
        
        do {
            _ = try hub.unregisterAllWithDeviceToken(deviceToken)
            NSLog("unregistered everything")
            
            _ = try hub.registerNativeWithDeviceToken(deviceToken, tags: categories as Set<NSObject>)
            NSLog("registered")
            
        } catch {
            NSLog("Error registering for notifications with token")
        }

    }
}

