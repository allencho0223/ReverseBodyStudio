using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using API.RBS.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.RBS.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signinManager;
        public AuthController(IConfiguration config, IMapper mapper
            , UserManager<User> userManager, SignInManager<User> signinManager)
        {
            _signinManager = signinManager;
            _userManager = userManager;
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            if (userForRegisterDto.userType.Equals("Client"))
                userToCreate = _mapper.Map<Client>(userForRegisterDto);
            else if (userForRegisterDto.userType.Equals("Instructor"))
                userToCreate = _mapper.Map<Instructor>(userForRegisterDto);
            
            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForListDto>(userToCreate);

            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser"
                    , new { controller = "Users", id = userToCreate.Id }, userToReturn);
            }
            
            return BadRequest("유저를 등록할 수 없습니다.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.UserName);

            var result = await _signinManager
                .CheckPasswordSignInAsync(user, userForLoginDto.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users
                        .FirstOrDefaultAsync(u => u.NormalizedUserName
                            == userForLoginDto.UserName.ToUpper());

                var userToReturn = _mapper.Map<UserForListDto>(appUser);
                // Write a token into a response that we send back to our clients.
                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result
                });
            }
            
            return Unauthorized();
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            // Building up the token containing 2 claims
            var claims = new List<Claim>
            {
                // In order to make sure the tokens are valid token when it comes back the server needs to sign this token
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

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

            return tokenHandler.WriteToken(token);
        }
}
}