1) This sample also has an UWP application built using React Native acting as manager application to dispatch news and survey information to various users and survey groups. The application also helps creating new users and editing groups a user is assigned to.

> For manager login, use the following endpoint and POST body to generate user credentials of your choice. You can use any HTTP REST client of your choice to do so.

**Endpoint**

`POST {{endpoint}}api/axuthenticate/register-admin `

**Body**
```
{
	"username": "<USER_NAME>",
	"email": "<EMAIL>",
	"password": "<PASSWORD>"
}
```
Once registered, you should be able to login to the UWP application with the same credentials.