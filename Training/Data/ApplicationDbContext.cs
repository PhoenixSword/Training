using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Training.Models;

namespace Training.Data
{
    public sealed class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }
        //public DbSet<Member> Members { get; set; }
        //public DbSet<Debt> Debts { get; set; }
    }
}
