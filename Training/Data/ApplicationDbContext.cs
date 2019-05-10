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
        }
        public new DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<SchoolchildEvent> SchoolchildEvents { get; set; }
    }
}
