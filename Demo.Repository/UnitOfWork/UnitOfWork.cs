using Demo.Data.Models;
using Demo.Repository.Repositories;
using Demo.Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Repository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DemoDBContext _context;

        public UnitOfWork(DemoDBContext context)
        {
            _context = context;
            Demos = new DemoRepository(_context);
        }

        public IDemoRepository Demos { get; private set; }

        public int Complete()
        {
           return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
