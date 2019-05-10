using Training.Models.ViewModel;

namespace Training.Models.Mapping
{
    public static class EventMapping
    {
        public static SchoolchildEventViewModel MapSchoolchild(this Event e)
        {
            return new SchoolchildEventViewModel
            {
                Id = e.Id,
                CountLevels = e.CountLevels,
                Name = e.Name,
                Teacher = e.Teacher,
                TeacherId = e.TeacherId,
                Url = e.Url,
                Completed = false
            };
        }

        public static TeacherEventViewModel MapTeacher(this Event e, int count)
        {
            return new TeacherEventViewModel
            {
                Id = e.Id,
                CountLevels = e.CountLevels,
                Name = e.Name,
                Teacher = e.Teacher,
                TeacherId = e.TeacherId,
                Url = e.Url,
                CompletedCount = 0,
                Count = count
            };
        }
    }
}
