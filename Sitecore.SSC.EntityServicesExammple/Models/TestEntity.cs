using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Sitecore.Services.Core.Model;

namespace Sitecore.SSC.EntityServicesExammple.Models
{
    public class TestEntity : EntityIdentity
    {
        [Required]
        public string Title { get; set; }

        public string Text { get; set; }
    }
}