using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Chat.Models
{
    public class MessageDTO
    {
      public string From { get; set; }
        public string Message { get; set; }
        public string  Group { get; set; }
    }
}
