# Sitecore.SSC.EntityService.Example

Some examples of Sitecore EntityService as well as ServicesApiController that support ASP.NET authorization.

## Custom EntityService

In order to call GET request following for example in Postman:
http://-host_name-/sitecore/api/ssc/Sitecore-SSC-EntityServicesExammple-Controllers/TestEntity
You can CRUD that entities using appropriate requests.

## Custom ServicesApiController

In order to call GET request following for example in Postman:

http://-host_name-/sitecore/api/exampleservice/

You will get "401 Unauthorized" at first. You need to login using following standard Sitecore SSC method:

POST http://-host_name-/sitecore/api/ssc/auth/login
"Content-Type: application/json" should be set as well as credentials in Request body:

```json
{
    "domain": "sitecore",
    "username": "admin",
    "password": "b"
}
```

If you are using Postman and Interceptor there, ".ASPXAUTH" cookie will be intercepted and used in the next request, so your request will be authenticated.

## Custom authorization filter

One more option to make all the custom EntityServices and ServicesApiController be authorized is to create custom authorization filter.
See an example in this class: "CustomSecurityPolicyFilter.cs". It is registered in "Sitecore.Services.Client.config" file (sorry not yet implemented as an elegant config patch):

```xml
<filter>Sitecore.SSC.EntityServicesExammple.Authentication.CustomSecurityPolicyFilter, Sitecore.SSC.EntityServicesExammple</filter>
``` 



**Note:** [Sitecore.Services.Client-boilerplate](https://github.com/Sitecore/Sitecore.Services.Client-boilerplate) was used as an example


