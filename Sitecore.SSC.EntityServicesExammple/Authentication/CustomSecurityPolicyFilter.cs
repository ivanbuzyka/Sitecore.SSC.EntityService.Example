using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Sitecore.SSC.EntityServicesExammple.Authentication
{
    public class CustomSecurityPolicyFilter : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            HttpRequestMessage request = actionContext.Request;
            if (!actionContext.RequestContext.Principal.Identity.IsAuthenticated || 
                actionContext.RequestContext.Principal.Identity.Name.Equals(@"extranet\anonymous", StringComparison.InvariantCultureIgnoreCase))
            {
                actionContext.Response = request.CreateResponse(HttpStatusCode.Forbidden);
                actionContext.Response.StatusCode = HttpStatusCode.Forbidden;
                actionContext.Response.Content = new StringContent("Authentication is required", Encoding.UTF8, "text/html");
            }
        }
    }
}