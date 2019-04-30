using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Training.Models;

namespace Training.Controllers
{
    public class HomeController: Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private string UserId => User.FindFirst(ClaimTypes.NameIdentifier).Value;
        public HomeController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public IEnumerable<User> Index()
        {
            return _userManager.Users.Where(u => u.TeacherId == UserId).ToList();
        }
    }
}
