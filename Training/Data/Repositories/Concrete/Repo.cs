using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Training.Data.Repositories.Abstract;
using Training.Models;

namespace Training.Data.Repositories.Concrete
{
    public class Repo : IRepo
    {
        private readonly ApplicationDbContext _ctx;
        private readonly UserManager<User> _userManager;
        private IEnumerable<Event> Events => _ctx.Events.ToList();

        public Repo(ApplicationDbContext applicationDbContext, UserManager<User> userManager)
        {
            _ctx = applicationDbContext;
            _userManager = userManager;
        }

        public IEnumerable<object> GetSchoolChilds(string userId)
        {
            return _userManager.Users.Where(u => u.TeacherId == userId).Select(s => new { s.Id, s.Email, s.Password, s.Fio }).ToList();
        }

        public IEnumerable<Event> GetEvents(string userId)
        {
            return Events.Where(e => e.TeacherId == userId);
        }

        public async Task<bool> AddSchoolChilds(IEnumerable<ApplicationUserModel> listUserModels, string userId)
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
                    TeacherId = userId
                };

                if (applicationUserModel.Id == "00000000-0000-0000-0000-000000000000")
                {
                    user.Id = Guid.NewGuid().ToString();
                }
                else
                {
                    user.Id = applicationUserModel.Id;
                    await RemoveSchoolChilds(applicationUserModel.Id);
                }
                await _userManager.CreateAsync(user, applicationUserModel.Password);
                await _userManager.AddToRoleAsync(user, "Schoolchild");
            }
            return true;
        }

        public bool AddEvents(IEnumerable<Event> listEvents, string userId)
        {
            foreach (var eventModel in listEvents)
            {
                var ev = new Event
                {
                    Id = eventModel.Id,
                    Name = eventModel.Name,
                    Url = eventModel.Url,
                    CountLevels = eventModel.CountLevels,
                    TeacherId = userId
                };

                if (eventModel.Id == "00000000-0000-0000-0000-000000000000")
                {
                    ev.Id = Guid.NewGuid().ToString();
                }
                else
                {
                    ev.Id = eventModel.Id;
                    RemoveEvents(eventModel.Id);
                }
                _ctx.Add(ev);
            }
            _ctx.SaveChanges();
            return true;
        }

        public async Task<bool> RemoveSchoolChilds(string id)
        {
            var deletedUser = await _userManager.FindByIdAsync(id);
            await _userManager.DeleteAsync(deletedUser);
            return true;
        }

        public bool RemoveEvents(string id)
        {
            var deletedEvent = _ctx.Events.FirstOrDefault(e => e.Id == id);
            _ctx.Events.Remove(deletedEvent ?? throw new InvalidOperationException());
            _ctx.SaveChanges();
            return true;
        }

        public bool SaveResults()
        {
            return true;
        }

        private string Hash(string password)
        {
            var salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

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
