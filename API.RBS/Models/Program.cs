

namespace API.RBS.Models
{
    public class Programme
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Effect { get; set; }
        public int InstructorId { get; set; }
        public Instructor Instructor { get; set; }
    }
}