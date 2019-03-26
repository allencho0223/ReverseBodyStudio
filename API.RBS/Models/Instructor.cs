using System;
using System.Collections.Generic;

namespace API.RBS.Models
{
    public class Instructor : User
    {
        public string Major { get; set; }
        public string Degree { get; set; }
        public string Specialty { get; set; }
        public ICollection<Programme> Programmes { get; set; }
        public ICollection<Experience> Experiences { get; set; }
    }
}