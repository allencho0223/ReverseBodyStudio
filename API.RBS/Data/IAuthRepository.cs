using System.Threading.Tasks;
using API.RBS.Models;

namespace API.RBS.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string userName, string password);
         Task<bool> UserExists(string userName);
    }
}