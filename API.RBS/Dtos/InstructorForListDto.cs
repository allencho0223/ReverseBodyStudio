using System.Collections.Generic;
using API.RBS.Models;

namespace API.RBS.Dtos
{
    public class InstructorForListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string EnglishName { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string ThumbnailSrc { get; set; }
        public string ProfileSrc { get; set; }
        public ICollection<ExperiencesForListDto> Experiences { get; set; }
    }
}