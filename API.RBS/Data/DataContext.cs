using API.RBS.Models;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Programme> Programmes { get; set; }
        public DbSet<Symptom> Symptoms { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ClientImage> ClientImages { get; set; }
    }
}