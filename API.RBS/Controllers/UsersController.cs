using System.Collections.Generic;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    // This only allows the controller to authorised users
    // [Authorize(Roles = "User, Instructor, Customer")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRbsRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IRbsRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("instructors")]
        public async Task<IActionResult> GetInstructors()
        {
            var instructors = await _repo.GetInstructors();

            var instructorsToReturn = _mapper.Map<IEnumerable<InstructorForListDto>>(instructors);

            return Ok(instructorsToReturn);
        }

        [HttpGet("instructors/{id}")]
        public async Task<IActionResult> GetInstructor(int id)
        {
            var instructor = await _repo.GetInstructor(id);

            var instructorToReturn = _mapper.Map<InstructorForListDto>(instructor);

            return Ok(instructorToReturn);
        }

        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomers()
        {
            var customers = await _repo.GetCustomers();

            var customersToReturn = _mapper.Map<IEnumerable<CustomerForListDto>>(customers);

            return Ok(customersToReturn);
        }

        [HttpGet("customers/{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _repo.GetCustomer(id);

            var customerToReturn = _mapper.Map<CustomerForListDto>(customer);

            return Ok(customerToReturn);
        }

    }
}