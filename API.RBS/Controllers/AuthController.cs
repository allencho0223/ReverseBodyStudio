using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using API.RBS.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.RBS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // Validate request with [FromBody] hint in front of UserForRegisterDto
            // When without [ApiController] Data Annotation above the class
            // if (!ModelState.IsValid)
            //     return BadRequest(ModelState);
            
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

            if (await _repo.UserExists(userForRegisterDto.UserName))
                return BadRequest("이미 사용중인 아이디입니다.");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);
        
            if (userForRegisterDto.userType.Equals("Client"))
            {
                userToCreate = _mapper.Map<Client>(userForRegisterDto);
            }
            else if (userForRegisterDto.userType.Equals("Instructor"))
            {
                userToCreate = _mapper.Map<Instructor>(userForRegisterDto);
            }

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
            var userToReturn = _mapper.Map<UserForListDto>(createdUser);
            return CreatedAtRoute("GetUser"
                , new {controller = "Users", id = createdUser.Id}, userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            // Check in to make sure we have a user and their username and password matches
            // with stored in the database for that particular user
            var userFromRepo = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            // Building up the token containing 2 claims
            var claims = new[]
            {
                // In order to make sure the tokens are valid token when it comes back the server needs to sign this token
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            // Creating a security key and we're using this key as part of the signing credentials
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            // Encrypted this key with a hashing algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Actually create a token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            // Create a security token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // Create token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Write a token into a response that we send back to our clients.
            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });

        }
    }
}