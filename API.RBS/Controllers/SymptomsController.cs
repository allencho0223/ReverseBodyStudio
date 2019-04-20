using System.Collections.Generic;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using API.RBS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [Route("api/users/clients/{clientId}/[controller]")]
    [ApiController]
    public class SymptomsController : ControllerBase
    {
        private readonly IRbsRepository _repo;
        private readonly DataContext _context;
        public SymptomsController(IRbsRepository repo, DataContext context)
        {
            _context = context;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AssignSymptom(int clientId, SymptomForListDto symptomForListDto)
        {
            // if (clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var clientFromRepo = await _repo.GetClient(clientId);

            var symptomForReturn = new Symptom
            {
                SymptomName = symptomForListDto.SymptomName,
                Details = symptomForListDto.Details,
                ClientId = clientId
            };

            clientFromRepo.Symptoms.Add(symptomForReturn);

            if (await _repo.SaveAll())
            {
                return StatusCode(201);
            }
            return BadRequest("프로그램 등록에 실패하였습니다");
        }

        [HttpGet]
        public async Task<IActionResult> GetSymptoms(int clientId)
        {
            var clientFromRepo = await _repo.GetClient(clientId);
            var symptoms = await _context.Symptoms.ToListAsync();
            var assignedSymptoms = new List<Symptom>();
            for (var i = 0; i < symptoms.Count; i++)
            {
                if (symptoms[i].ClientId == clientId)
                {
                    assignedSymptoms.Add(symptoms[i]);
                }
            }

            return Ok(assignedSymptoms);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSymptom(int id)
        {
            var symptom = await _context.Symptoms.FindAsync(id);

            if (symptom == null)
            {
                return NotFound();
            }

            _context.Symptoms.Remove(symptom);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}