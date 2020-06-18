using Demo.Chat.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Claims;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace Demo.Chat.Hubs
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ChatHub: Hub
    {
        IConfiguration _config;

        public ChatHub(IConfiguration config )
        {
            _config = config;
        }
        
        public async Task NewMessage(string message)
        {

            var response = new MessageDTO();
            response.From = Context.UserIdentifier.Trim();
            response.Message = message;
           await Clients.All.SendAsync("Send", response);
         //   await Clients.All.SendAsync("Send",  message);
        }

        protected string GetName(string token)
        {
            string secret = _config["JwtToken:SecretKey"];
            var key = Encoding.UTF8.GetBytes(secret);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            var claims = handler.ValidateToken(token, validations, out var tokenSecure);
            return claims.Identity.Name;
        }
    }
}
