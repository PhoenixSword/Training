using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Training.Models;

namespace Training.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TeachersController: Controller
    {
        private readonly UserManager<User> _userManager;
        private string UserId => User.FindFirst(ClaimTypes.NameIdentifier).Value;
        public TeachersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public IEnumerable<object> GetSchoolChilds()
        {
            return _userManager.Users.Where(u => u.TeacherId == UserId).Select(s => new { s.Id, s.PasswordHash, s.Email, s.UserName }).ToList();
          
        }
    }
}
