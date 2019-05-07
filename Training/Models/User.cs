using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Training.Models
{
    public class User : IdentityUser
    {
        public string TeacherId { get; set; }
        public string Fio { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Event> Events { get; set; }
    }
}
