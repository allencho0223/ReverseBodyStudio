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

        [HttpGet("{id}", Name = "GetUser")]
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

        [HttpGet("clients")]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _repo.GetClients();

            var clientsToReturn = _mapper.Map<IEnumerable<ClientForListDto>>(clients);

            return Ok(clientsToReturn);
        }

        [HttpGet("clients/{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _repo.GetClient(id);

            var clientToReturn = _mapper.Map<ClientForListDto>(client);

            return Ok(clientToReturn);
        }

        [HttpPut("clients/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto UserForUpdateDto)
        {
            // FindFirst method to check if the user is the current user that's passed to the token to our server
            // That's attempting to access this route and doing an HttpPut
            // And If the id of the path the user is trying to access doesn't match what's in the token,
            // Then we're going to return Unauthorized()
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var clientFromRepo = await _repo.GetClient(id);

            _mapper.Map(UserForUpdateDto, clientFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("업데이트에 실패하였습니다");
        }


    }
}