using System;
using System.Collections.Generic;

namespace API.RBS.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        // public DateTime DateOfBirth { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string Major { get; set; }
        public string Degree { get; set; }
        public string Specialty { get; set; }
        public ICollection<Programme> Programmes { get; set; }
    }
}