using API.RBS.Dtos;
using API.RBS.Models;
using AutoMapper;

namespace API.RBS.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Instructor, InstructorForListDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Customer, CustomerForListDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Experience, ExperiencesForListDto>();
            CreateMap<Symptom, SymptomsForListDto>();
        }
    }
}