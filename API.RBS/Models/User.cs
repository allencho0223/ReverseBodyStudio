using System;

namespace API.RBS.Models
{
    /*
        how to process register?
            1. Register as a user
            2. Once admin gives a role to a user in between instructor and customer,
            3. Add details and update database where relative
            4. Delete user details from User table
     */
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string EnglishName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }   
    }
}