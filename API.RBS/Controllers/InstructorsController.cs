using System.Linq;
using System.Threading.Tasks;
using API.RBS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorsController : ControllerBase
    {
        private readonly DataContext _context;
        public InstructorsController(DataContext context)
        {
            _context = context;
        }

        // GET api/instructors
        [HttpGet]
        public async Task<IActionResult> GetInstructors()
        {
            var instructors = await _context.Instructors.ToListAsync();
            return Ok(instructors);
        }

        // GET api/instructors/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInstructor(int id)
        {
            var instructor = await _context.Instructors
                                .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(instructor);
        }
    }
}