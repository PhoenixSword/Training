using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace Training.Models
{
    public class User : IdentityUser
    {
        public string TeacherId { get; set; }
    }
}
