using System;

namespace API.RBS.Models
{
    public class ClientImage
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public DateTime DateTaken { get; set; }
        public string PublicId { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }        
    }
}