using System;

namespace API.RBS.Models
{
    public class CustomerImage
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public DateTime DateTaken { get; set; }
        public string PublicId { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}