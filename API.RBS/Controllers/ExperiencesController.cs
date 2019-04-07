using System.Collections.Generic;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperiencesController : ControllerBase
    {
        private readonly DataContext _context;
        public ExperiencesController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<IActionResult> GetExperiences()
        {
            var experiences = await _context.Experiences.ToListAsync();
            return Ok(experiences);
        }

        // [HttpGet("{instructorId/id}")]
        // public async Task<IActionResult> GetExperience(int id)
        // {
        //     var experience = await _context.Experiences.FirstOrDefaultAsync(x => x.Id == id);
        //     return Ok(experience);
        // }

        [HttpGet("{instructorId}")]
        public async Task<IActionResult> GetInstructorExperiences(int instructorId)
        {
            var experiences = await _context.Experiences.ToListAsync();
            var instructorExps = new List<Experience>();
            for (var i = 0; i < experiences.Count; i++)
            {
                if (experiences[i].InstructorId == instructorId)
                {
                    instructorExps.Add(experiences[i]);
                }
            }
            return Ok(instructorExps);
        }
    }
}