using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using API.RBS.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    // This only allows the controller to authorised users
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRbsRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public UsersController(IRbsRepository repo, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForListDto>(user);

            return Ok(userToReturn);
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

        [HttpPut("customers/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto UserForUpdateDto)
        {
            // FindFirst method to check if the user is the current user that's passed to the token to our server
            // That's attempting to access this route and doing an HttpPut
            // And If the id of the path the user is trying to access doesn't match what's in the token,
            // Then we're going to return Unauthorized()
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var customerFromRepo = await _repo.GetCustomer(id);

            _mapper.Map(UserForUpdateDto, customerFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("업데이트에 실패하였습니다");
        }


    }
}