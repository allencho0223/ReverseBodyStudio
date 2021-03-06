using System.Collections.Generic;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RBS.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly DataContext _context;
        public ImagesController(DataContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<IActionResult> GetImages()
        {
            var images = await _context.Images.ToListAsync();
            return Ok(images);
        }

        [HttpGet("facilities")]
        public async Task<IActionResult> GetFacilityImages()
        {
            var images = await _context.Images.ToListAsync();
            var facilities = new List<Image>();
            for (var i = 0; i < images.Count; i++)
            {
                if (images[i].Type.Contains("Facilities"))
                {
                    facilities.Add(images[i]);
                }
            }

            return Ok(facilities);
        }

        [HttpGet("bna")]
        public async Task<IActionResult> GetBnaImages()
        {
            var images = await _context.Images.ToListAsync();
            var bnaImages = new List<Image>();
            for (var i = 0; i < images.Count; i++)
            {
                if (images[i].Type.Contains("Before") || images[i].Type.Contains("After"))
                {
                    bnaImages.Add(images[i]);
                }
            }

            return Ok(bnaImages);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = await _context.Images.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(image);
        }

    }
}