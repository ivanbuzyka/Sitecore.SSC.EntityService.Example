using System.Web.Http;
using Sitecore.Pipelines;

namespace Sitecore.SSC.EntityServicesExammple.Pipelines
{
    public class RegisterHttpRoutes
    {
        public void Process(PipelineArgs args)
        {
            GlobalConfiguration.Configure(Configure);
        }
        protected void Configure(HttpConfiguration configuration)
        {
            var routes = configuration.Routes;
            routes.MapHttpRoute("ExampleService", "sitecore/api/exampleservice/{id}", new
            {
                controller = "ExampleService",
                action = "GenerateEntity"
            });
        }
    }
}