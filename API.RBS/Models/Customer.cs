using System;
using System.Collections.Generic;

namespace API.RBS.Models
{
    public class Customer : User
    {
        public string Purpose { get; set; }
        public ICollection<Symptom> Symptoms { get; set; }
    }
}