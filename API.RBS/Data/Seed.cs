using System.Collections.Generic;
using API.RBS.Models;
using Newtonsoft.Json;

namespace API.RBS.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUser()
        {
            var userData = System.IO.File.ReadAllText("./seeder/Users.json");
            var instructorData = System.IO.File.ReadAllText("./seeder/Instructors.json");
            var customerData = System.IO.File.ReadAllText("./seeder/Customers.json");

            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            var instructors = JsonConvert.DeserializeObject<List<Instructor>>(instructorData);
            var customers = JsonConvert.DeserializeObject<List<Customer>>(customerData);

            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.UserName = user.UserName.ToLower();
                _context.Users.Add(user);
            }

            foreach (var instructor in instructors)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                instructor.PasswordHash = passwordHash;
                instructor.PasswordSalt = passwordSalt;
                instructor.UserName = instructor.UserName.ToLower();
                _context.Users.Add(instructor);
            }

            foreach (var customer in customers)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                customer.PasswordHash = passwordHash;
                customer.PasswordSalt = passwordSalt;
                customer.UserName = customer.UserName.ToLower();
                _context.Users.Add(customer);
            }

            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}