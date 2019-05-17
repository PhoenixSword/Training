using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Training.Models;
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
                Fio = applicationUserModel.Fio,
                Email = applicationUserModel.Email,
                Password = applicationUserModel.Password,
                Date = DateTime.Now
            };

            var result = await _userManager.CreateAsync(user, applicationUserModel.Password);

            if (!result.Succeeded) return Ok(result);

            await _signInManager.SignInAsync(user, false);
            await _userManager.AddToRoleAsync(user, "Teacher");
            
            var resultModel = new ResultModel
            {
                Fio = user.Fio,
                Role = "Teacher",
                ResultStatus = result.Succeeded,
                Token = (string) GenerateJwtToken(applicationUserModel.Email, user)
            };

            return Ok(resultModel);

        }

        [HttpPost]
        public async Task<object> Login( [FromBody] ApplicationUserModel applicationUserModel)
        {
            var result = await _signInManager.PasswordSignInAsync(applicationUserModel.Email, applicationUserModel.Password, false, false);
            var resultModel = new ResultModel();
            if (!result.Succeeded) return BadRequest(resultModel);
            var appUser = _userManager.Users.SingleOrDefault(r => r.Email == applicationUserModel.Email);
            var role = _userManager.GetRolesAsync(appUser).Result.FirstOrDefault();
            if (appUser == null) return Ok(resultModel);
            resultModel.Fio = appUser.Fio;
            resultModel.Role = role;
            resultModel.ResultStatus = result.Succeeded;
            resultModel.Token = (string) GenerateJwtToken(applicationUserModel.Email, appUser);

            return Ok(resultModel);
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