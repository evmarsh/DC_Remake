using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using backend.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		public IConfiguration _config;
		private readonly IUserService _userService;

		public LoginController(IConfiguration config, IUserService userService)
		{
			_config = config;
			_userService = userService;
		}

		[AllowAnonymous]
		[HttpPost]
		public IActionResult Login([FromBody] User user)
		{
			if (user == null)
			{
				return BadRequest("Invalid client request");
			}
			var authUser = _userService.Authenticate(user.Username, user.PasswordHash);
			if (authUser != null)
			{
				var token = GenerateJSONWebToken(user);
				return Ok(new { token });
			}
			else
			{
				return Unauthorized();
			}
		}

		private string GenerateJSONWebToken(User user)
		{
			var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new[] {
				new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, user.Username),
				new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, user.Email)
			};

			var token = new JwtSecurityToken(_config["Jwt:Issuer"],
				_config["Jwt:Issuer"],
				claims,
				expires: DateTime.Now.AddMinutes(60),
				signingCredentials: credentials);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
