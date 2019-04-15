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

        public async Task<Customer> GetCustomer(int id)
        {
            var customer = await _context.Customers
                .Include(s => s.Symptoms)
                .Include(c => c.CustomerImages)
                .Include(p => p.Programmes)
                .FirstOrDefaultAsync(c => c.Id == id);
            return customer;
        }

        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            var customers = await _context.Customers
                .Include(s => s.Symptoms)
                .Include(c => c.CustomerImages)
                .Include(p => p.Programmes)
                .ToListAsync();

            return customers;
        }

        public async Task<Instructor> GetInstructor(int id)
        {
            var instructor = await _context.Instructors
                .Include(c => c.Customers)
                    .ThenInclude(s => s.Symptoms)
                .Include(c => c.Customers)
                    .ThenInclude(ci => ci.CustomerImages)
                .Include(c => c.Customers)
                    .ThenInclude(p => p.Programmes)
                .Include(e => e.Experiences)
                .FirstOrDefaultAsync(i => i.Id == id);

            return instructor;
        }

        public async Task<IEnumerable<Instructor>> GetInstructors()
        {
            var instructors = await _context.Instructors
                .Include(c => c.Customers)
                    .ThenInclude(s => s.Symptoms)
                .Include(c => c.Customers)
                    .ThenInclude(ci => ci.CustomerImages)
                .Include(c => c.Customers)
                    .ThenInclude(p => p.Programmes)
                .Include(e => e.Experiences)
                .ToListAsync();
            return instructors;
        }

        public async Task<CustomerImage> GetPhoto(int id)
        {
            var photo = await _context.CustomerImages.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<Programme> GetProgramme(int id)
        {
            var programme = await _context.Programmes.FirstOrDefaultAsync(p => p.Id == id);

            return programme;
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