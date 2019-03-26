namespace API.RBS.Models
{
    public class Experience
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int InstructorId { get; set; }
        public Instructor Instructor { get; set; }
    }
}