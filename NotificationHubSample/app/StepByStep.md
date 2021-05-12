# Sample for Azure Notification Hub

## Azure Resource
> You need to create below resources in azure
![alt text](Capture.JPG)

## Backend

### Model's

### Controller's and service 

1) Create a notification service having methods to create and delete installtion.Also create method to send notification to all registered users and to get all registration information.
-------------------------------------------------------------------
```
public interface INotificationService
{
   Task<bool> CreateOrUpdateInstallationAsync(DeviceInstallation deviceInstallation, CancellationToken cancellationToken);
   Task<bool> DeleteInstallationByIdAsync(string installationId, CancellationToken cancellationToken);
   Task<bool> RequestNotificationAsync(NotificationMessage notificationMessage, IList<string> tags, CancellationToken cancellationToken);
   Task<List<DeviceTrend>> GetAllRegistrationInfoAsync();
}
```
# [Step 2](./controllers.md)

# [Step 3](./notificationcontroller.md)

## How to Run backend?
1) Locate /NotificationHub.Sample.API/appsettings.json and     setup your SQL Server connection string.

> "ConnectionStrings": {
    "SQLServerConnectionString": "Server=tcp:<SERVER_NAME>,1433;Initial Catalog=<DB_NAME>;Persist Security Info=False;User ID=<DB_USER_NAME>;Password=<PASSWORD>;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  },
2) You can run the API solution locally / on any IIS server or deploy in as Azure Web App Service. Keep the URL of the API ready.

# Frontend

## [Step 4](./frontend.md)

## How to Run frontend ?

Open app folder in your preferred terminal / shell window.
1.	Run npm install
2.	Run npm run start from one terminal window

### React Native For Windows
1) To run the manager windows application, run the following two commands in two separate terminal inside app folder.
$ npm run start
$ npx react-native run-windows

> Known Issue: If you get the following error while running the solution, error MSB4057: The target "Deploy" does not exist in the project., this is a known issue with React Native for Windows. To fix this please unload the .csproj file for CheckboxWindows and ReactNativeAsyncStorage projects inside Visual Studio after opening app.sln inside app/windows folder and add following line just before `...</Project>` and reload the project. `<Target Name="Deploy"/>`

# UWP Application for manager

## [Step 5](./manageruwp.md)

# How to run application on Andriod and iOS

To run the iOS and Android client application run the following two commands in two separate terminal inside app folder. Please note you won't be able to receive notifications on iOS simulator.

> $ npm run start

> $ npx react-native run-android

> or

> $ npx react-native run-ios

# Related links

## How to send push notifications to react native aplication using azure notification hub
https://docs.microsoft.com/en-us/azure/developer/mobile-apps/notification-hubs-backend-service-react-native

## How to send push notifications to Andriod devices using Firebase SDK 
https://docs.microsoft.com/en-us/azure/notification-hubs/android-sdk