using Demo.Data.Models;
using Demo.Repository.Repositories.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Demo.Repository.Repositories
{
    public class FriendsRepository : Repository<Friends>, IFriendsRepository
    {
        DemoDBContext _context;
        public FriendsRepository(DemoDBContext context) : base(context)
        {
            _context = context;
        }

        public Friends FindFriend(int Id)
        {
           return  _context.friends.FirstOrDefault(x => x.Id == Id);
        }

        public List<Friends> ListofActiveFriends(int Id)
        {
            return _context.friends.Where(x => (x.Requestor == Id || x.Acceptor == Id) && x.IsActive).ToList();
        }

        public List<Friends> ListofFriends(int Id)
        {
            return _context.friends.Where(x => x.Requestor == Id || x.Acceptor == Id).ToList();
        }

        public List<Friends> ListofFriendsRequesting(int Id)
        {
            return _context.friends.Where(x => (x.Acceptor == Id) && !x.IsActive).ToList();
        }

        public List<Friends> ListofRequestedFriends(int Id)
        {
            return _context.friends.Where(x => (x.Requestor == Id || x.Acceptor == Id) && !x.IsActive).ToList();
        }
    }
}
