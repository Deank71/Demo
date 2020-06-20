using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Data.Models
{
    public class Friends
    {
        public int Id { get; set; }
        public int Requestor { get; set; }
        public int Acceptor { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime RequestedDate { get; set; }
        public DateTime AcceptedDate { get; set; }
    }
}
