using System.Collections.Generic;
using API.RBS.Models;

namespace API.RBS.Dtos
{
    public class InstructorForListDto : UserForListDto
    {
        public ICollection<ExperienceForListDto> Experiences { get; set; }
        public ICollection<ClientForListDto> Clients { get; set; }
    }
}