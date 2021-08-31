using AutoMapper;
using EmExpressProject.Interfaces;
using EmExpressProject.Models;
using EmExpressProject.Models.Custom;
using EmExpressProject.ModelView;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.Services
{
    public class ProductService : IProductService
    {
        private  IProductRepository _productRepository;
        private readonly IGeneralService _generalService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        public ProductService(IProductRepository productRepository, IMapper mapper, IWebHostEnvironment env, IGeneralService generalService)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _env = env;
            _generalService = generalService;
        }
        public IEnumerable<ProductsViewModel> GetProducts()
        {
            var data = _productRepository.GetAll();
            var result = _mapper.Map<IList<ProductsViewModel>>(data);
            return result;
        }

        public bool AddProduct(ProductsViewModel _)
        {
            _.CreatedByUserId = _generalService.GetLoggedOnUserId();
            _.CreatedOnDate = DateTime.Now;
            _.IsDeleted = false;
            _.DataDocumentName =  UploadOrganizationImage(_.ProfilePhoto, _.DocumentName);
            var data = _mapper.Map<Products>(_);

            try
            {
                _productRepository.Add(data);
            }
            catch(IOException ex)
            {
                return false;
            }


            return _productRepository.SaveChanges() > 0;
        }
        public bool EditProduct(ProductsViewModel _, int id)
        {
            var data = _productRepository.FindOne(x => x.Id == id);
            data.Price = _.Price;
            data.Specification = _.Specification;
            data.Title = _.Title;
            data.Description = _.Description;
            data.LastModifiedByUserId = _generalService.GetLoggedOnUserId();
            data.LastModifiedOnDate = DateTime.Now;
            data.DataDocumentName = UploadOrganizationImage(_.ProfilePhoto, _.DocumentName);
            try
            {
                _productRepository.Update(data);
            }
            catch (IOException ex)
            {
                return false;
            }


            return _productRepository.SaveChanges() > 0;
        }

        public ProductsViewModel GetProduct(int id)
        {
            var data = _productRepository.FindOne(x => x.Id == id);
            var result =  _mapper.Map<ProductsViewModel>(data);
            result.AbsolutePath = "~\\wwwroot";
            return result;
        }
        private string UploadOrganizationImage(IFormFile _, string product)
        {
            var relativePath = "\\Product\\ProfilePhoto\\" + DateTime.Now.ToString(@"dd-MM-yyy");
            var folder = _env.WebRootPath + relativePath;
            var imagePath = System.IO.Directory.CreateDirectory(folder);
            var extension = new FileInfo(_.FileName).Extension;
            var generatedName = "auto_" + new Random().Next(00000000, 99999999) + "_" + product + extension;

             UploadDocument(_, Path.Combine(folder, generatedName));

            return Path.Combine(relativePath, generatedName);
        }

        public int UploadDocument(IFormFile document, string path)
        {
            var extension = Path.GetExtension(path);
            var type = GetDocumentType(extension);
            if (type == (int)DocumentTypes.Other)
                throw new ArgumentException("File type not allowed");

            using (var stream = new FileStream(path, FileMode.Create))
            {
                 document.CopyToAsync(stream);
            }

            return type;
        }

        private int GetDocumentType(string extension)
        {
            extension = extension.ToLower();

            //var extensions = _repositoryEmployee.GetEmployeeDocumentTypes();

            //foreach (var item in extensions)
            //{
            //    if (extension.Equals(item.Extension.ToLower()))
            //        return item.Id;
            //}
            return (int)DocumentTypes.Jpeg;
        }
    }
}
