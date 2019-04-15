using System.Threading.Tasks;
using API.RBS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [Route("api/users/customers/{customerId}/[controller]")]
    [ApiController]
    public class SymptomsController : ControllerBase
    {
        private readonly DataContext _context;
        public SymptomsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSymptoms()
        {
            var symptoms = await _context.Symptoms.ToListAsync();
            return Ok(symptoms);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSymptom(int id)
        {
            var symptom = await _context.Symptoms
                            .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(symptom);
        }
    }
}