using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.ModelView
{
    public class ProductsViewModel
    {
        public int Id { get; set; }
        public string DocumentName { get; set; }
        public string DataDocumentName { get; set; }
        public string AbsolutePath { get; set; } = "~\\wwwroo";
        public string Title { get; set; }
        public string Description { get; set; }
        public string Specification { get; set; }
        public string Price { get; set; }
        public string CreatedByUserId { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
        public string LastModifiedByUserId { get; set; }
        public bool? IsDeleted { get; set; }
        public IFormFile ProfilePhoto { get; set; }
        public string ProfilePhotoPath { get; set; }
    }
}
