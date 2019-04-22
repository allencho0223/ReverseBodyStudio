using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.RBS.Models
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public string UserType { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}