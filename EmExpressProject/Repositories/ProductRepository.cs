using EmExpressProject.Interfaces;
using EmExpressProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.Repositories
{
    public class ProductRepository : Repository<Products>, IProductRepository
    {
        public EmExpressDbContext _emExpressContext { get { return _context as EmExpressDbContext; } }
        public ProductRepository(EmExpressDbContext context) : base(context)
        {
        }

        public bool AddProduct(Products _)
        {
            _emExpressContext.Add(_);
            return _emExpressContext.SaveChanges() > 0;
        }
    }
}
