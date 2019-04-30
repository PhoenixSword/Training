using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Training.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Training.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<object> Register(ApplicationUserModel applicationUserModel)
        {
            var user = new User
            {
                UserName = applicationUserModel.Email,
                Email = applicationUserModel.Email
            };

            var result = await _userManager.CreateAsync(user, applicationUserModel.Password);

            if (!result.Succeeded) return Ok(result);

            await _signInManager.SignInAsync(user, false);

            if (applicationUserModel.Type)
            {
                await _userManager.AddToRoleAsync(user, "Teacher");
            }
            else
            {
                await _userManager.AddToRoleAsync(user, "Schoolchild");
            }

            var role = _userManager.GetRolesAsync(user).Result.FirstOrDefault();
            var resultModel = new ResultModel
            {
                Email = user.Email,
                Role = role,
                ResultStatus = result.Succeeded,
                Token = (string) (GenerateJwtToken(applicationUserModel.Email, user))
            };

            return Ok(resultModel);

        }

        [HttpPost]
        public async Task<object> Login( [FromBody] ApplicationUserModel applicationUserModel)
        {
            var result = await _signInManager.PasswordSignInAsync(applicationUserModel.Email, applicationUserModel.Password, false, false);
            var resultModel = new ResultModel();
            if (result.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(r => r.Email == applicationUserModel.Email);
                var role = _userManager.GetRolesAsync(appUser).Result.FirstOrDefault();
                if (appUser != null)
                {
                    resultModel.Role = role;
                    resultModel.Email = appUser.Email;
                    resultModel.ResultStatus = result.Succeeded;
                    resultModel.Token = (string) (GenerateJwtToken(applicationUserModel.Email, appUser));
                }

                return Ok(resultModel);
            }

            resultModel.ResultStatus = result.IsNotAllowed;
            return BadRequest(resultModel);
        }

        [Authorize]
        [HttpGet]
        public async Task<object> Protected()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            return user;
        }

        private object GenerateJwtToken(string email, User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}