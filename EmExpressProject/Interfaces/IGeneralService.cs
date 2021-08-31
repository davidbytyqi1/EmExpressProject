using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.Interfaces
{
    public interface IGeneralService
    {
        string GetLoggedOnUserId();
        string GetNumberSummary(int page, int pageSize, int totalNumber);
    }
}
