using System.Collections.Generic;
using System.Threading.Tasks;
using Training.Models;

namespace Training.Data.Repositories.Abstract
{
    public interface IRepo
    {
        IEnumerable<object> GetSchoolChilds(string userId);
        IEnumerable<Event> GetEvents(string userId, string teacherId);
        IEnumerable<Event> GetCompletedEvents(string userId, string teacherId);
        IEnumerable<Event> GetEvents(string userId);
        Task<IEnumerable<object>> AddSchoolChilds(IEnumerable<ApplicationUserModel> listUserModels, string userId);
        IEnumerable<Event> AddEvents(IEnumerable<Event> listEvents, string userId);
        Task<bool> RemoveSchoolChilds(string id);
        bool RemoveEvents(string id);
        bool SaveResults(string eventId, int score, string userid);
        IEnumerable<object> GetSchoolChildsWithEvents(string userId);

    }
    
}
