using Demo.Data.Models;
using Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Repository.Repositories.Interfaces
{
    public interface IFriendsRepository : IRepository<Friends>
    {

        public List<Friends> ListofFriends(int Id);

        public List<Friends> ListofActiveFriends(int Id);

        public List<Friends> ListofRequestedFriends(int Id);

        public Friends FindFriend(int Id);

    }
}
