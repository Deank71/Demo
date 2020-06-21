using Demo.Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Repository.UnitOfWork
{
   public interface IUnitOfWork: IDisposable
    {
       public IDemoRepository Demos { get; }
        public IUserRepository User { get; }
        public IFriendsRepository Friends { get; }
        public  int Complete();
    }

}
