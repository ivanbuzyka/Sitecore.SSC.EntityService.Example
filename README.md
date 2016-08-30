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

## Enable cross-browser requests

What is that? Just if you try to request the website http://siteA from the website http://siteB (for example by JavaScript).
In Sitecore it won't work out-of-the-box. Following headers has to be added to the ``system.webServer -> httpProtocol -> customHeaders`` in ``web.config`` :

```xml
<add name="Access-Control-Allow-Origin" value="http://your-client-hostname" />
<add name="Access-Control-Allow-Headers" value="*" />
<add name="Access-Control-Allow-Methods" value="*" />
<add name="Access-Control-Allow-Credentials" value="true" />
```

<mark>
**Note**: pay attention to the origin host name. ``http`` or ``https`` matters there. According to the specification, you cannot add multiple origins. However, there is a solution for that - to handle request on server-side, check its origin in some custom "allowed origins" list and, if it is there, set ``Access-Control-Allow-Origin`` to the appropriate one.
</mark>

It is also important to modify ``Global.asax`` in order to have similar to following one (the reason: OPTIONS request, that is called by web service sometimes, isn't handled appropriately by IIS, so that it should be supplied with right headers at some point):

```csharp
<%@Application Language='C#' Inherits="Sitecore.Web.Application" %>
<script runat="server">
        void Application_BeginRequest(object sender, EventArgs e)
        {
        var context = HttpContext.Current;
            var response = context.Response;

            if (context.Request.HttpMethod == "OPTIONS")
            {
                response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
                response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                response.AddHeader("Access-Control-Max-Age", "1728000");
                response.AddHeader("Access-Control-Allow-Credentials", "true");
                response.End();
            }
        }
</script>
```

## Sample Console Client

There is an example of console client that just requests standard Home item by ItemServices.
In order to make this client working do following things:
1. Turn of 


**Note:** [Sitecore.Services.Client-boilerplate](https://github.com/Sitecore/Sitecore.Services.Client-boilerplate) was used as an example


