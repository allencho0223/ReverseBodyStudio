using System.Collections.Generic;
using API.RBS.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace API.RBS.Data
{
    public class Seed
    {
        // private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public void SeedUser()
        {

            // if (_userManager.Users.Any())
            // {

            // }
            var userData = System.IO.File.ReadAllText("./seeder/Users.json");
            var instructorData = System.IO.File.ReadAllText("./seeder/Instructors.json");
            var clientData = System.IO.File.ReadAllText("./seeder/Clients.json");

            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            var instructors = JsonConvert.DeserializeObject<List<Instructor>>(instructorData);
            var clients = JsonConvert.DeserializeObject<List<Client>>(clientData);

            var roles = new List<Role>
            {
                new Role { Name = "Admin" },
                new Role { Name = "Instructor" },
                new Role { Name = "Client" }
            };

            foreach (var role in roles)
            {
                _roleManager.CreateAsync(role).Wait();
            }

            foreach (var user in users)
            {
                _userManager.CreateAsync(user, "password").Wait();
                _userManager.AddToRoleAsync(user, "Admin").Wait();
            }

            foreach (var instructor in instructors)
            {
                _userManager.CreateAsync(instructor, "password").Wait();
                _userManager.AddToRoleAsync(instructor, "Instructor").Wait();
            }

            foreach (var client in clients)
            {
                _userManager.CreateAsync(client, "password").Wait();
                _userManager.AddToRoleAsync(client, "Client").Wait();
            }
        }
    }
}