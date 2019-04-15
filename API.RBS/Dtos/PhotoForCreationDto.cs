using System;
using Microsoft.AspNetCore.Http;

namespace API.RBS.Dtos
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateTaken { get; set; }
        public string PublicId { get; set; }
        public int CustomerId { get; set; }
        public PhotoForCreationDto()
        {
            DateTaken = DateTime.Now;
        }
    }
}