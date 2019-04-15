using API.RBS.Dtos;
using API.RBS.Models;
using AutoMapper;

namespace API.RBS.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Source to Destination
            CreateMap<User, UserForListDto>();
            CreateMap<Instructor, InstructorForListDto>();
            CreateMap<Customer, CustomerForListDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Experience, ExperiencesForListDto>();
            CreateMap<Symptom, SymptomsForListDto>();
            CreateMap<UserForUpdateDto, Customer>();
            CreateMap<CustomerImage, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, CustomerImage>();
            CreateMap<Programme, ProgrammeForListDto>();
        }
    }
}