# Notify Users

This Visual Studio 2013 project is a copy of the completed code for the [Azure Notification Hubs Notify Users](https://azure.microsoft.com/documentation/articles/notification-hubs-aspnet-backend-windows-dotnet-notify-users/) tutorial.

* To test sending notification with the Windows 10 Action Center use the "ToastGeneric" template instead of "ToastText01". This code will be updated soon for Windows 10.

		// Windows 10
		var toast = @"<toast><visual><binding template=""ToastGeneric"">" +
						"<text id=""1"">Hello from a .NET App!</text>" +
					"</binding></visual></toast>";