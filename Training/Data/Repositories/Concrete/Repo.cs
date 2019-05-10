using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Training.Data.Repositories.Abstract;
using Training.Models;
using Training.Models.Mapping;

namespace Training.Data.Repositories.Concrete
{
    public class Repo : IRepo
    {
        private readonly ApplicationDbContext _ctx;
        private readonly UserManager<User> _userManager;
        private IEnumerable<Event> Events => _ctx.Events.ToList();
        private IEnumerable<SchoolchildEvent> SchoolchildEvents => _ctx.SchoolchildEvents.ToList();

        public Repo(ApplicationDbContext applicationDbContext, UserManager<User> userManager)
        {
            _ctx = applicationDbContext;
            _userManager = userManager;
        }

        public IEnumerable<object> GetSchoolChilds(string userId)
        {
            return _userManager.Users.Where(u => u.TeacherId == userId).Select(s => new { s.Id, s.Email, s.Password, s.Fio }).ToList();
        }

        public IEnumerable<Event> GetEvents(string userId, string teacherId)
        {
            var sevents = SchoolchildEvents.Where(s => s.UserId == userId).ToList();
            var events = Events.Where(e => e.TeacherId == teacherId).Select(e=>e.MapSchoolchild()).ToList();
            foreach (var item in events)
            {
                var existsEvent = sevents.FirstOrDefault(e => e.EventId == item.Id);
                if (existsEvent == null) continue;
                item.Completed = true;
                item.Score = existsEvent.Score;
            }
            return events;
        }
        public IEnumerable<Event> GetEvents(string userId)
        {
            var count = _userManager.Users.Count(s => s.TeacherId == userId);
            var events = Events.Where(e => e.TeacherId == userId).Select(e => e.MapTeacher(count)).ToList();
            foreach (var item in events)
            {
                var completedCount = SchoolchildEvents.Count(s => s.EventId == item.Id);
                if (completedCount != 0)
                {
                    item.CompletedCount = completedCount;
                }
            }
            return events;
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
                if (eventModel.Url.Equals(""))
                {
                    continue;
                }

                var oldEvent = Events.FirstOrDefault(e => e.Id == eventModel.Id);
                if (oldEvent != null)
                {
                    oldEvent.CountLevels = eventModel.CountLevels;
                    oldEvent.Name = eventModel.Name;
                    oldEvent.Url = eventModel.Url;
                }
                else
                {
                    var ev = new Event
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = eventModel.Name,
                        Url = eventModel.Url,
                        CountLevels = eventModel.CountLevels,
                        TeacherId = userId
                    };
                    _ctx.Add(ev);
                }
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

        public bool SaveResults(string eventId, int score, string userid)
        {
            var ev = SchoolchildEvents.FirstOrDefault(s => s.EventId == eventId && s.UserId == userid);
            if (ev != null)
            {
                ev.Score = score;
            }
            else
            {
                _ctx.Add(new SchoolchildEvent
                {
                    Date = DateTime.Now, EventId = eventId, UserId = userid, Id = Guid.NewGuid().ToString(), Score = score
                });
            }
            _ctx.SaveChanges();
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
