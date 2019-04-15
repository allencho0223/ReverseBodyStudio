

using System;

namespace API.RBS.Models
{
    public class Programme
    {
        public int Id { get; set; }
        public string ProgrammeName { get; set; }
        public string RelatedLink { get; set; }
        public string Description { get; set; }
        public DateTime SessionTime { get; set; }
        public string ProgrammeType { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}