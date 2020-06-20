using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Data.Models
{
    public class DemoDBContext:DbContext
    {
        public DemoDBContext(DbContextOptions<DemoDBContext> options) : base(options)
        {

        }
        public DbSet<Demos> demos { get; set; }
        public DbSet<User> user { get; set; }
         
        public DbSet<Friends> friends { get; set; }
    }
}
