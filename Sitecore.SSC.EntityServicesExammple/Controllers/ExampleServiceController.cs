using System.Web.Http.Cors;
using System.Web.Http;
using Sitecore.Services.Core;
using Sitecore.Services.Infrastructure.Web.Http;
using Sitecore.SSC.EntityServicesExammple.Models;

namespace Sitecore.SSC.EntityServicesExammple.Controllers
{
    public class ExampleServiceController : ServicesApiController
    {
        [HttpGet]
        public TestEntity GenerateEntity(string id)
        {
            var testEntity = new TestEntity
            {
                Text = Sitecore.Context.Database.GetRootItem().Name,
                Title = Sitecore.Context.Language.Name,
                Id = Sitecore.Context.Database.GetRootItem().ID.ToString()
            };

            return testEntity;
        }
    }
}