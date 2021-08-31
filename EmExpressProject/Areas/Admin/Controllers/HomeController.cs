using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EmExpressProject.Models;
using Microsoft.AspNetCore.Authorization;
using EmExpressProject.Interfaces;
using InternalApplication.KendoFilter;
using EmExpressProject.ModelView;
using System.IO;

namespace EmExpressProject.Areas.Admin.Controllers
{
    [Area("Admin")]
    //[Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IProductService _productService;

        public HomeController(ILogger<HomeController> logger, IProductService productService)
        {
            _logger = logger;
            _productService = productService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult Products()
        {
            return View();
        }
        public IActionResult Read_Products()
        {
            return Ok(new { Data = _productService.GetProducts().ToList(), Total = 100});
        }

        [HttpGet]
        public IActionResult AddEditProduct(int? Id)
        {
            if(Id == null)
                 return View(new ProductsViewModel());
            else
            {
                return View(_productService.GetProduct((int)Id));  
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateUpdateProduct(ProductsViewModel model)
        {
            try
            {
                if (model.Id == 0)
                    _productService.AddProduct(model);
                else
                    _productService.EditProduct(model, model.Id);
            }
            catch(IOException exc)
            {

            }
            
            return RedirectToAction("Products", "Home");
        }
    }
}
