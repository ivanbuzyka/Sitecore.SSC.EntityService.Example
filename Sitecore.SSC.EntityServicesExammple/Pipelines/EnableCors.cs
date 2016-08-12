using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Sitecore.Pipelines;

namespace Sitecore.SSC.EntityServicesExammple.Pipelines
{
    public class EnableCors
    {
        public void Process(PipelineArgs args)
        {
            //Is not proved whether it works.
            GlobalConfiguration.Configuration.EnableCors(new EnableCorsAttribute("*", "*", "*"));
        }
    }
}