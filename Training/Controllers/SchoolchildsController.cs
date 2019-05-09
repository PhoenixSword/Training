using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Training.Data.Repositories.Abstract;
using Training.Models;

namespace Training.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SchoolchildsController : Controller
    {
        private readonly IRepo _repo;
        private readonly UserManager<User> _userManager;
        private string UserId => User.FindFirst(ClaimTypes.NameIdentifier).Value;
        private string TeacherId => _userManager.Users.FirstOrDefault(u=>u.Id ==UserId)?.TeacherId;
        public SchoolchildsController(UserManager<User> userManager, IRepo repo)
        {
            _repo = repo;
            _userManager = userManager;
        }

        public IEnumerable<Event> GetEvents()
        {
            return _repo.GetEvents(TeacherId);
        }
        [HttpPost]
        public bool SaveResults()
        {
            return _repo.SaveResults();
        }
    }
}
