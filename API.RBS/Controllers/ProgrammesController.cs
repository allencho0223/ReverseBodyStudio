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
    public class ProgrammesController : ControllerBase
    {
        private readonly DataContext _context;
        public ProgrammesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("rehab")]
        public async Task<IActionResult> GetRehabProgrammes()
        {
            var programmes = await _context.Programmes.ToListAsync();
            var rehabProgrammes = new List<Programme>();
            for (var i = 0; i < programmes.Count; i++)
            {
                if (programmes[i].ProgrammeType.Equals("Rehab"))
                {
                    rehabProgrammes.Add(programmes[i]);
                }
            }
            return Ok(rehabProgrammes);
        }

        [HttpGet("fmw")]
        public async Task<IActionResult> GetFmwProgrammes()
        {
            var programmes = await _context.Programmes.ToListAsync();
            var fmwProgrammes = new List<Programme>();
            for (var i = 0; i < programmes.Count; i++)
            {
                if (programmes[i].ProgrammeType.Equals("FMW"))
                {
                    fmwProgrammes.Add(programmes[i]);
                }
            }
            return Ok(fmwProgrammes);
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