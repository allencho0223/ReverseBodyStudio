using System;
using System.Collections.Generic;

namespace API.RBS.Models
{
    public class Instructor : User
    {
        public ICollection<Experience> Experiences { get; set; }
        public ICollection<Customer> Customers { get; set; }
    }
}