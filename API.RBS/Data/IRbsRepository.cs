using System.Collections.Generic;
using System.Threading.Tasks;
using API.RBS.Models;

namespace API.RBS.Data
{
    public interface IRbsRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Instructor>> GetInstructors();
         Task<IEnumerable<Customer>> GetCustomers();
         Task<Instructor> GetInstructor(int id);
         Task<Customer> GetCustomer(int id);
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<CustomerImage> GetPhoto(int id);
         Task<Programme> GetProgramme(int id);
    }
}