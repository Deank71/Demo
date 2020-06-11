using Demo.Data.Models;
using Demo.Repository.Repositories.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Repository.Repositories
{
    public class DemoRepository : Repository<Demos>, IDemoRepository
    {
        DemoDBContext _context;
        public DemoRepository(DemoDBContext context) : base(context)
        {
            _context = context;
        }

        public List<string> ListofDemos()
        {
          return  _context.demos.Select(x => x.Name).ToList();          
        }
    }
}
