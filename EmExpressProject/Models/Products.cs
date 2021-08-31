using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmExpressProject.Models
{
    public partial class Products
    {
        public int Id { get; set; }
        public string DocumentName { get; set; }
        public string DataDocumentName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Specification { get; set; }
        public string Price { get; set; }
        public string CreatedByUserId { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
        public string LastModifiedByUserId { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
