using System.Threading.Tasks;
using API.RBS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgrammesController : ControllerBase
    {
        private readonly DataContext _context;
        public ProgrammesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProgrammes()
        {
            var programmes = await _context.Programmes.ToListAsync();
            return Ok(programmes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProgramme(int id)
        {
            var programme = await _context.Programmes
                            .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(programme);
        }
    }
}