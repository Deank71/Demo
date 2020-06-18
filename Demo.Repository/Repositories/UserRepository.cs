using Demo.Data.Models;
using Demo.Repository.Repositories.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Demo.Repository.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        DemoDBContext _context;
        public UserRepository(DemoDBContext context) : base(context)
        {
            _context = context;
        }

        public User AuthenticateUser(string email, string password)
        {
            return _context.user.FirstOrDefault(x => x.EmailAddress == email || x.Password == password);

        }

        public bool CheckIfExist(string user, string email)
        {
           
        var users =   _context.user.Where(x => x.UserName == user || x.EmailAddress == email);
            if (users.Any())
                return true;

            return false;
        }

        public List<string> ListofUsers()
        {
            return _context.user.Select(x => x.UserName).ToList();
        }
    }
}
