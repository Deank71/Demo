using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Demo.Chat.Models;
using Demo.Data.Models;
using Demo.Repository.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language;

namespace Demo.Chat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public FriendsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize]
        [HttpGet]
        [Route("/api/FriendRequest")]
        public virtual IActionResult FriendRequest()
        {
            var requests = _unitOfWork.Friends.ListofRequestedFriends(GetUserId());
            IEnumerable<FriendRequestDTO> requestDTO = BuildFriendList(requests);
            return StatusCode(200, requestDTO);
        }

        private IEnumerable<FriendRequestDTO> BuildFriendList(List<Friends> requests)
        {
            return requests.Select(x => new FriendRequestDTO
            {
                Id = x.Id,
                requestorId = x.Requestor,
                requestorEmail = _unitOfWork.User.Find(u => u.Id == x.Requestor).FirstOrDefault().EmailAddress,
                acceptorId = x.Acceptor,
                acceptorEmail = _unitOfWork.User.Find(u => u.Id == x.Acceptor).FirstOrDefault().EmailAddress,
                isActive = x.IsActive

            });
        }

        [Authorize]
        [HttpGet]
        [Route("/api/ActiveFriends")]
        public virtual IActionResult ActiveFriends()
        {
            var requests = _unitOfWork.Friends.ListofActiveFriends(GetUserId());
            IEnumerable<FriendRequestDTO> requestDTO = BuildFriendList(requests);
            return StatusCode(200, requestDTO);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/AcceptRequest")]
        public virtual IActionResult AcceptRequest([FromBody]List<FriendRequestDTO> requests)
        {
            List<int> requestIds = requests.Select(x => x.Id).ToList();

          var  acceptedRequests =  _unitOfWork.Friends.Find(x => requestIds.Contains(x.Id));
            foreach (var friend in acceptedRequests)
            {
                friend.IsActive = true;
                friend.AcceptedDate = DateTime.Now;
             
            }
            _unitOfWork.Complete();
            return StatusCode(200, "Complete");
        }


        [HttpGet]
        [Route("/api/RequestFriend")]
        public virtual IActionResult RequestFriend(string email)
        {
            int? acceptorId = 0;
            CreateEmptyUser(email, out acceptorId);

            GenerateRequest(GetUserId(), acceptorId);
            return StatusCode(200, "Complete");
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private int GetUserId()
        {
            var user = User.Identities.FirstOrDefault().Claims.Where(x => x.Type.Contains("nameidentifier"));
            var userId = user.FirstOrDefault(x => x.Properties.Values.Contains("nameid")).Value;
            int requestorId = 0;
            int.TryParse(userId, out requestorId);
            return requestorId;
        }

        private void GenerateRequest(int requestorId, int? acceptorId)
        {
            var request = (new Friends
            {
                Requestor = requestorId,
                Acceptor = (int)acceptorId,
                AcceptedDate = DateTime.Now,
                RequestedDate = DateTime.Now,

            });
            if (_unitOfWork.Friends.Find(x => (x.Requestor == requestorId && x.Acceptor == acceptorId) ||
             (x.Acceptor == requestorId && x.Requestor == acceptorId)).Any())
                return;

            _unitOfWork.Friends.Add(request);
            _unitOfWork.Complete();
            return;

        }

        private void CreateEmptyUser(string emailAddress, out int? acceptorId)
        {
            acceptorId = _unitOfWork.User.findUserByEmail(emailAddress);
            if (acceptorId == null)
            {
                var user = new User();
                user.EmailAddress = emailAddress;
                _unitOfWork.User.Add(user);
                _unitOfWork.Complete();
                acceptorId = _unitOfWork.User.findUserByEmail(emailAddress);
            }

        }
    }
}