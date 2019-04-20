using System.Collections.Generic;

namespace API.RBS.Dtos
{
    public class ClientForListDto : UserForListDto
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
        public ICollection<SymptomForListDto> Symptoms { get; set; }
        public ICollection<PhotoForReturnDto> ClientImages { get; set; }
        public ICollection<ProgrammeForListDto> Programmes { get; set; }        
    }
}