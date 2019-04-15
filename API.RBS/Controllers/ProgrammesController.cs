using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using API.RBS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [Route("api/users/customers/{customerId}/[controller]")]
    [ApiController]
    public class ProgrammesController : ControllerBase
    {
        private readonly IRbsRepository _repo;
        private readonly DataContext _context;
        public ProgrammesController(IRbsRepository repo, DataContext context)
        {
            _context = context;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AssignProgramme(int customerId, ProgrammeForListDto programmeForListDto)
        {
            // if (customerId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var customerFromRepo = await _repo.GetCustomer(customerId);

            var programmeForReturn = new Programme
            {
                ProgrammeName = programmeForListDto.ProgrammeName,
                ProgrammeType = programmeForListDto.ProgrammeType,
                Description = programmeForListDto.Description,
                RelatedLink = programmeForListDto.RelatedLink,
                SessionTime = programmeForListDto.SessionTime,
                CustomerId = customerId
            };

            customerFromRepo.Programmes.Add(programmeForReturn);

            if (await _repo.SaveAll())
            {
                return StatusCode(201);
            }
            return BadRequest("프로그램 등록에 실패하였습니다");
        }

        [HttpGet]
        public async Task<IActionResult> GetProgrammes(int customerId)
        {
            var customerFromRepo = await _repo.GetCustomer(customerId);
            var programmes = await _context.Programmes.ToListAsync();
            var assignedProgrammes = new List<Programme>();
            for (var i = 0; i < programmes.Count; i++)
            {
                if (programmes[i].CustomerId == customerId)
                {
                    assignedProgrammes.Add(programmes[i]);
                }
            }

            return Ok(assignedProgrammes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgramme(int id)
        {
            var programme = await _context.Programmes.FindAsync(id);

            if (programme == null)
            {
                return NotFound();
            }

            _context.Programmes.Remove(programme);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProgramme(int id)
        {
            var programme = await _context.Programmes.FirstOrDefaultAsync(p => p.Id == id);

            return Ok(programme);
        }
    }
}