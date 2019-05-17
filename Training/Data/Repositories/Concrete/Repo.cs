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
            var list = _userManager.Users.Where(u => u.TeacherId == userId)
                .Select(s => new {s.Id, s.Email, s.Password, s.Fio, s.Date}).ToList().OrderBy(u=>u.Date);
            return list;
        }

        public IEnumerable<Event> GetEvents(string userId, string teacherId)
        {
            var sevents = SchoolchildEvents.Where(s => s.UserId == userId).ToList();
            var events = Events.Where(e => e.TeacherId == teacherId).Select(e => e.MapSchoolchild()).ToList();
            foreach (var item in events)
            {
                var existsEvent = sevents.FirstOrDefault(e => e.EventId == item.Id);
                if (existsEvent == null) continue;
                item.Completed = true;
                item.Score = existsEvent.Score;
            }
            return events;
        }

        public IEnumerable<Event> GetCompletedEvents(string userId, string teacherId)
        {
            List<Event> list = new List<Event>();
            var sevents = SchoolchildEvents.Where(s => s.UserId == userId).ToList();
            var events = Events.Where(e => e.TeacherId == teacherId).Select(e => e.MapSchoolchild()).ToList();
            foreach (var item in events)
            {
                var existsEvent = sevents.FirstOrDefault(e => e.EventId == item.Id);
                if (existsEvent == null) continue;
                item.Date = existsEvent.Date.ToString("f");
                item.Score = existsEvent.Score;
                list.Add(item);
            }
            return list;
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

        public async Task<IEnumerable<object>> AddSchoolChilds(IEnumerable<ApplicationUserModel> listUserModels, string userId)
        {
            foreach (var applicationUserModel in listUserModels)
            {
                if (applicationUserModel.Email.Equals("") || (applicationUserModel.Password.Equals("")))
                {
                    continue;
                }

                var oldUser = _userManager.Users.FirstOrDefault(u => u.Id == applicationUserModel.Id);
                if (oldUser != null)
                {
                    oldUser.Email = applicationUserModel.Email;
                    oldUser.UserName = applicationUserModel.Email;
                    oldUser.Password = applicationUserModel.Password;
                    oldUser.Fio = applicationUserModel.Fio;
                    await _userManager.UpdateAsync(oldUser);

                    var token = await _userManager.GeneratePasswordResetTokenAsync(oldUser);
                    await _userManager.ResetPasswordAsync(oldUser, token, applicationUserModel.Password);
                }
                else
                {
                    var user = new User
                    {
                        UserName = applicationUserModel.Email,
                        Fio = applicationUserModel.Fio,
                        Email = applicationUserModel.Email,
                        Password = applicationUserModel.Password,
                        TeacherId = userId,
                        Date = DateTime.Now
                    };
                    await _userManager.CreateAsync(user, user.Password);
                    await _userManager.AddToRoleAsync(user, "Schoolchild");
                }
            }
            return GetSchoolChilds(userId);
        }

        public IEnumerable<Event> AddEvents(IEnumerable<Event> listEvents, string userId)
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
            return GetEvents(userId);
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

        public IEnumerable<object> GetSchoolChildsWithEvents(string userId)
        {
            return _userManager.Users.Where(u => u.TeacherId == userId).Select(s => new { s.Id, s.Email, s.Password, s.Fio, s.Events }).ToList();
        }
    }
}
