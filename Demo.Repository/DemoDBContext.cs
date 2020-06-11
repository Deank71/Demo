using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public class DemoDBContext:DbContext
    {
        public DemoDBContext(DbContextOptions<DemoDBContext> options) : base(options)
        {

        }
    }
}
