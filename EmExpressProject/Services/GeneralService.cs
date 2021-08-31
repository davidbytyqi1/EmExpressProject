using EmExpressProject.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.Services
{
    public class GeneralService : IGeneralService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private IHttpContextAccessor _contextAccessor;

        public GeneralService(IHttpContextAccessor contextAccessor, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _contextAccessor = contextAccessor;
        }
        public string GetLoggedOnUserId()
        {
            return _userManager.GetUserId(_contextAccessor.HttpContext.User);
        }

        public string GetNumberSummary(int page, int pageSize, int totalNumber)
        {
            return (page * pageSize - (pageSize - 1)) + " - " + ((page * pageSize) > totalNumber ? totalNumber : (page * pageSize)) + " of " + totalNumber + " items";
        }
    }
}
