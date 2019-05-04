using System.ComponentModel.DataAnnotations;

namespace Training.Models
{
    public class ApplicationUserModel
    {
        public string Id { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        public string Fio { get; set; }

        public bool Type { get; set; } = false;

    }

    public class ResultModel
    {
        public string Role { get; set; }
        public bool ResultStatus { get; set; }
        public string Fio { get; set; }
        public string Token { get; set; }
    }

    public class TaskResultModel
    {
        public bool ResultStatus { get; set; }
        //public List<Task> Tasks { get; set; }
    }

}
