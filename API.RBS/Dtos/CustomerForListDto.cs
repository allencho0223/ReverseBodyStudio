using System;
using System.Collections.Generic;
using API.RBS.Models;

namespace API.RBS.Dtos
{
    public class CustomerForListDto : UserForListDto
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Purpose { get; set; }
        public int? InstructorId { get; set; }
        public ICollection<SymptomsForListDto> Symptoms { get; set; }
    }
}