using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Training.Models;

namespace Training.Controllers
{
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
            return _userManager.Users.Where(u => u.TeacherId == UserId).Select(s => new { s.Id, s.Email, s.Password, s.Fio }).ToList();
        }

        [HttpPost]
        public async Task<bool> AddSchoolChilds([FromBody] IEnumerable<ApplicationUserModel> listUserModels)
        {
            foreach (var applicationUserModel in listUserModels)
            {
                var user = new User
                {
                    Id = applicationUserModel.Id,
                    UserName = applicationUserModel.Email,
                    Fio = applicationUserModel.Fio,
                    Email = applicationUserModel.Email,
                    Password = applicationUserModel.Password,
                    PasswordHash = Hash(applicationUserModel.Password),
                    TeacherId = UserId
                };

                if (applicationUserModel.Id == "00000000-0000-0000-0000-000000000000")
                {
                    user.Id = Guid.NewGuid().ToString();
                }
                else
                {
                    user.Id = applicationUserModel.Id;
                    var deletedUser = await _userManager.FindByIdAsync(applicationUserModel.Id);
                    await _userManager.DeleteAsync(deletedUser);

                }
                await _userManager.CreateAsync(user, applicationUserModel.Password);
                await _userManager.AddToRoleAsync(user, "Schoolchild");
            }
            return true;
        }

        [HttpDelete]
        public async Task<bool> RemoveSchoolChilds(string id)
        {
            var deletedUser = await _userManager.FindByIdAsync(id);
            await _userManager.DeleteAsync(deletedUser);
            return true;
        }

        public string Hash(string password)
        {
            var salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashed;
        }
    }
}
