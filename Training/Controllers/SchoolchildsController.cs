using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Training.Models;

namespace Training.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SchoolchildsController : Controller
    {
        private readonly UserManager<User> _userManager;
        private string UserId => User.FindFirst(ClaimTypes.NameIdentifier).Value;
        public SchoolchildsController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

    }
}
