using API.RBS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Data
{
    public class DataContext : IdentityDbContext<User, Role, int
        , IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>
        , IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        // public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Programme> Programmes { get; set; }
        public DbSet<Symptom> Symptoms { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ClientImage> ClientImages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(UserRole => {
                UserRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                UserRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                UserRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
        }
    }
}