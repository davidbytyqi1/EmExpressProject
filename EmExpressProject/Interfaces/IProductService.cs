using EmExpressProject.ModelView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.Interfaces
{
    public interface IProductService
    {
        IEnumerable<ProductsViewModel> GetProducts();
        bool AddProduct(ProductsViewModel _);
        bool EditProduct(ProductsViewModel _, int id);
        ProductsViewModel GetProduct(int id);
    }
}
