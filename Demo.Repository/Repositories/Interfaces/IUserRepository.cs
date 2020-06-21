using Demo.Data.Models;
using Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Repository.Repositories.Interfaces
{
    public interface IUserRepository :IRepository<User>
    {
        public List<string> ListofUsers();

        public bool CheckIfExist(string user, string email);

        public int? findUserByEmail(string emailAddress);

        public User AuthenticateUser(string email, string password);

    }
}
