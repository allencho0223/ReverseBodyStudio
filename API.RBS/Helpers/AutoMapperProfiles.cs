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
            CreateMap<Client, ClientForListDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Experience, ExperienceForListDto>();
            CreateMap<Symptom, SymptomForListDto>();
            CreateMap<UserForUpdateDto, Client>();
            CreateMap<ClientImage, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, ClientImage>();
            CreateMap<Programme, ProgrammeForListDto>();
            CreateMap<UserForRegisterDto, Client>();
            CreateMap<UserForRegisterDto, Instructor>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}