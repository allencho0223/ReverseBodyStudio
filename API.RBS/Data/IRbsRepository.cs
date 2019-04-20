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
         Task<IEnumerable<Client>> GetClients();
         Task<Instructor> GetInstructor(int id);
         Task<Client> GetClient(int id);
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<ClientImage> GetPhoto(int id);
         Task<IEnumerable<ClientImage>> GetPhotos();
         Task<Programme> GetProgramme(int id);
         Task<Symptom> GetSymptom(int id);
         Task<IEnumerable<Experience>> GetExperiences();
    }
}