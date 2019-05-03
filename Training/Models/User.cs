using Microsoft.AspNetCore.Identity;

namespace Training.Models
{
    public class User : IdentityUser
    {
        public string TeacherId { get; set; }
        public string Fio { get; set; }
        public string Password { get; set; }
    }
}
