namespace API.RBS.Models
{
    public class Symptom
    {
        public int Id { get; set; }
        public string SymptomName { get; set; }
        public string Details { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}