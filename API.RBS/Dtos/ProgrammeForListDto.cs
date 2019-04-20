using System;

namespace API.RBS.Dtos
{
    public class ProgrammeForListDto
    {
        public string ProgrammeName { get; set; }
        public string RelatedLink { get; set; }
        public string Description { get; set; }
        public DateTime SessionTime { get; set; }
        public string ProgrammeType { get; set; }       
        public int ClientId { get; set; }
    }
}