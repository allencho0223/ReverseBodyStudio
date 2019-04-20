using System;

namespace API.RBS.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public DateTime DateTaken { get; set; }
        public string PublicId { get; set; }
        public int ClientId { get; set; }
    }
}