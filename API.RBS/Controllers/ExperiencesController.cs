using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using API.RBS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [AllowAnonymous]
    [Route("api/users/instructors/{instructorId}/[controller]")]
    [ApiController]
    public class ExperiencesController : ControllerBase
    {
        private readonly IRbsRepository _repo;
        private readonly DataContext _context;
        public ExperiencesController(IRbsRepository repo, DataContext context)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetInstructorExperiences(int instructorId)
        {
            var instructor = await _repo.GetInstructor(instructorId);
            return Ok(instructor.Experiences);
        }

        [HttpPost]
        public async Task<IActionResult> AddInstructorExperience(int instructorId, ExperienceForListDto experienceForListDto)
        {
            if (instructorId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var instructorFromRepo = await _repo.GetInstructor(instructorId);
            var experienceForReturn = new Experience
            {
                Description = experienceForListDto.Description,
                InstructorId = instructorId
            };

            instructorFromRepo.Experiences.Add(experienceForReturn);

            if (await _repo.SaveAll())
            {
                return StatusCode(201);
            }
            return BadRequest("프로그램 등록에 실패하였습니다");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExperience(int id)
        {
            var experience = await _context.Experiences.FindAsync(id);

            if (experience == null)
            {
                return NotFound();
            }

            _context.Experiences.Remove(experience);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}