using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Training.Data.Repositories.Abstract;
using Training.Models;
using Training.Models.ViewModel;

namespace Training.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TeachersController: Controller
    {
        private readonly IRepo _repo;
        private string UserId => User.FindFirst(ClaimTypes.NameIdentifier).Value;

        public TeachersController(IRepo repo)
        {
            _repo = repo;
        }
        public IEnumerable<object> GetSchoolChilds()
        {
            return _repo.GetSchoolChilds(UserId);
        }

        public IEnumerable<Event> GetEvents()
        {
            return _repo.GetEvents(UserId);
        }

        public IEnumerable<object> GetSchoolChildsWithEvents()
        {
            return _repo.GetSchoolChildsWithEvents(UserId);
        }
        public IEnumerable<Event> GetProfile(string id)
        {
            return _repo.GetCompletedEvents(id, UserId);
        }

        [HttpPost]
        public async Task<IEnumerable<object>> AddSchoolChilds([FromBody] IEnumerable<ApplicationUserModel> listUserModels)
        {
            return await _repo.AddSchoolChilds(listUserModels, UserId);
        }

        [HttpPost]
        public IEnumerable<Event> AddEvents([FromBody] IEnumerable<Event> eventsModels)
        {
            return  _repo.AddEvents(eventsModels, UserId);
        }

        [HttpPost]
        public bool SaveSettings([FromBody]SettingsModel settings)
        {
            return _repo.SaveSettings(settings);
        }

        [HttpDelete]
        public async Task<bool> RemoveSchoolChilds(string id)
        {
            await _repo.RemoveSchoolChilds(id);
            return true;
        }

        [HttpDelete]
        public bool RemoveEvents(string id)
        {
             _repo.RemoveEvents(id);
            return true;
        }
    }
}
