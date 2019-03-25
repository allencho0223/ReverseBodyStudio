using System;
using System.Collections.Generic;

namespace API.RBS.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Purpose { get; set; }
        // public DateTime DateOfBirth { get; set; }
        public ICollection<Symptom> Symptoms { get; set; }
    }
}