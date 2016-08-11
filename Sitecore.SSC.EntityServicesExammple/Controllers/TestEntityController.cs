using System.Net.Http;
using System.Web.Http.Cors;
using Sitecore.Services.Core;
using Sitecore.Services.Infrastructure.Sitecore.Services;
using Sitecore.SSC.EntityServicesExammple.Models;
using Sitecore.SSC.EntityServicesExammple.Repositories;

namespace Sitecore.SSC.EntityServicesExammple.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ServicesController]
    public class TestEntityController : EntityService<TestEntity>
    {
        public TestEntityController() : this(new TestEntityRepository())
        {
        }

        public TestEntityController(IRepository<TestEntity> repository) : base(repository)
        {
        }

    }
}