using System.Collections.Generic;
using System.Threading.Tasks;
using API.RBS.Models;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Data
{
    public class RbsRepository : IRbsRepository
    {
        private readonly DataContext _context;
        public RbsRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Client> GetClient(int id)
        {
            var client = await _context.Clients
                .Include(s => s.Symptoms)
                .Include(c => c.ClientImages)
                .Include(p => p.Programmes)
                .FirstOrDefaultAsync(c => c.Id == id);
            return client;
        }

        public async Task<IEnumerable<Client>> GetClients()
        {
            var clients = await _context.Clients
                .Include(s => s.Symptoms)
                .Include(c => c.ClientImages)
                .Include(p => p.Programmes)
                .ToListAsync();

            return clients;
        }

        public async Task<IEnumerable<Experience>> GetExperiences()
        {
            var experiences = await _context.Experiences.ToListAsync();
            return experiences;
        }

        public async Task<Instructor> GetInstructor(int id)
        {
            var instructor = await _context.Instructors
                .Include(c => c.Clients)
                    .ThenInclude(s => s.Symptoms)
                .Include(c => c.Clients)
                    .ThenInclude(ci => ci.ClientImages)
                .Include(c => c.Clients)
                    .ThenInclude(p => p.Programmes)
                .Include(e => e.Experiences)
                .FirstOrDefaultAsync(i => i.Id == id);

            return instructor;
        }

        public async Task<IEnumerable<Instructor>> GetInstructors()
        {
            var instructors = await _context.Instructors
                .Include(c => c.Clients)
                    .ThenInclude(s => s.Symptoms)
                .Include(c => c.Clients)
                    .ThenInclude(ci => ci.ClientImages)
                .Include(c => c.Clients)
                    .ThenInclude(p => p.Programmes)
                .Include(e => e.Experiences)
                .ToListAsync();
            return instructors;
        }

        public async Task<ClientImage> GetPhoto(int id)
        {
            var photo = await _context.ClientImages.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<IEnumerable<ClientImage>> GetPhotos()
        {
            var photos = await _context.ClientImages.ToListAsync();

            return photos;
        }

        public async Task<Programme> GetProgramme(int id)
        {
            var programme = await _context.Programmes.FirstOrDefaultAsync(p => p.Id == id);

            return programme;
        }

        public async Task<Symptom> GetSymptom(int id)
        {
            var symptom = await _context.Symptoms.FirstOrDefaultAsync(s => s.Id == id);

            return symptom;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}