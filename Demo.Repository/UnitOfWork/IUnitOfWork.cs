using Demo.Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Repository.UnitOfWork
{
    interface IUnitOfWork: IDisposable
    {
        IDemoRepository Demos { get; }
        int Complete();
    }

}
