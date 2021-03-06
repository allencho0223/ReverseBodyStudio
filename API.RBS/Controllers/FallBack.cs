using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.RBS.Controllers
{
    [AllowAnonymous]
    public class FallBack : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory()
                , "wwwroot", "index.html"), "text/HTML");
        }
    }
}