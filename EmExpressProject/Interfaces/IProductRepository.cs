using EmExpressProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.Interfaces
{
    public interface IProductRepository : IRepository<Products>
    {
        bool AddProduct(Products _);
    }
}
