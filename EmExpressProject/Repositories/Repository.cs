using EmExpressProject.Interfaces;
using EmExpressProject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace EmExpressProject.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly EmExpressDbContext _context;

        public Repository(EmExpressDbContext context)
        {
            _context = context;
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);

        }

        public void AddRange(IEnumerable<T> entities)
        {
            _context.Set<T>().AddRange(entities);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicte, params Expression<Func<T, object>>[] includes)
        {
            var query = _context.Set<T>().Where(predicte);
            return includes.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }

        public T FindOne(Expression<Func<T, bool>> predicte)
        {
            return _context.Set<T>().FirstOrDefault(predicte);
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public T GetById(int id)
        {
            return _context.Set<T>().Find(id);
        }


        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public void Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
