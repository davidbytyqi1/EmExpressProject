using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternalApplication.KendoFilter
{
    public class Filters
    {
        public string Value { get; set; }
        public string Operator { get; set; }
        public string Field { get; set; }
        public bool IgnoreCase { get; set; }
    }
}
