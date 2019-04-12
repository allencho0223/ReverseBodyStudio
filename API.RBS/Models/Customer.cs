using System;
using System.Collections.Generic;

namespace API.RBS.Models
{
    public class Customer : User
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Purpose { get; set; }
        public int? InstructorId { get; set; }
        public Instructor Instructor { get; set; }
        public ICollection<Symptom> Symptoms { get; set; }
    }
}