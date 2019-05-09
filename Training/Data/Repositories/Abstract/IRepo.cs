using System.Collections.Generic;
using System.Threading.Tasks;
using Training.Models;

namespace Training.Data.Repositories.Abstract
{
    public interface IRepo
    {
        IEnumerable<object> GetSchoolChilds(string userId);
        IEnumerable<Event> GetEvents(string userId);
        Task<bool> AddSchoolChilds(IEnumerable<ApplicationUserModel> listUserModels, string userId);
        bool AddEvents(IEnumerable<Event> listEvents, string userId);
        Task<bool> RemoveSchoolChilds(string id);
        bool RemoveEvents(string id);
        bool SaveResults();

    }
}
