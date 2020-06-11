using Demo.Data.Models;
using Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Repository.Repositories.Interfaces
{
    public interface IDemoRepository :IRepository<Demos>
    {
        public List<string> ListofDemos();
    }
}
