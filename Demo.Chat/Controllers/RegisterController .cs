using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Demo.Data.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Schema;
using Demo.Repository.UnitOfWork;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Demo.Chat.Controllers
{
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private IConfiguration _config;
        private IUnitOfWork _unitOfWork;
        public RegisterController(IConfiguration config, IUnitOfWork unitOfWork)
        {
            _config = config;
            _unitOfWork = unitOfWork;
        }
        // GET: api/<controller>

        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet]
        public IActionResult Register(string userName, string email, string password)
        {
            User register = new User();
            register.UserName = userName;
            register.EmailAddress = email;
            register.Password = password;
            IActionResult response = Unauthorized();
            if (!_unitOfWork.User.CheckIfExist(register.UserName, register.EmailAddress))
            {
                var refreshToken = Guid.NewGuid();
                var tokenStr = GenerateJSONWebToken(register);
                register.JWT = tokenStr;
                register.refreshToken = refreshToken;
                _unitOfWork.User.Add(register);
                response = Ok(new { jwt = tokenStr, refreshToken = refreshToken });
                _unitOfWork.Complete();
                return response;
            }
            else
                return BadRequest("User or email already exists!");
        }

        private string GenerateJSONWebToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtToken:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.EmailAddress),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: _config["JwtToken:Issuer"],
                audience: _config["JwtToken:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [Authorize]
        [HttpPost("Post")]
        public string Post()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var userName = claim[0].Value;
            return "Welcome To:  " + userName;
        }


        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
