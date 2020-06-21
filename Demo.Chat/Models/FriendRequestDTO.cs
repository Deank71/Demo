using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Chat.Models
{
    public class FriendRequestDTO
    {
        public int Id { get; set; }
        public int requestorId { get; set; }
        public string requestorEmail { get; set; }
        public int acceptorId { get; set; }
        public string acceptorEmail { get; set; }
        public bool isActive { get; set; }
    }
}
