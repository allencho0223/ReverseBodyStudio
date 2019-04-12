using System.Collections.Generic;
using API.RBS.Models;

namespace API.RBS.Dtos
{
    public class InstructorForListDto : UserForListDto
    {
        public ICollection<ExperiencesForListDto> Experiences { get; set; }
        public ICollection<Customer> Customers { get; set; }
    }
}