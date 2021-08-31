using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternalApplication.KendoFilter
{
    public class DataSourceFilter
    {
        public int Take { get; set; }
        public int Skip { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public Filter Filter { get; set; }
        public List<Sort> Sort { get; set; }
    }
}
