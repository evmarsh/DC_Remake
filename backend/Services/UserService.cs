using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
	public class UserService : IUserService
	{
		private readonly ApplicationContextDb _context;

		public UserService(ApplicationContextDb context)
		{
			_context = context;
		}

		public async Task<User> Authenticate(string username, string password)
		{
			if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
			{
				return null;
			}

			string passwordSalt = await _context.Users
				.Where(x => x.Username == username)
				.Select(x => x.PasswordSalt)
				.FirstOrDefaultAsync();

			if (passwordSalt != null)
			{
				string passwordHash = HashPassword(password + passwordSalt);
				return await _context.Users.FirstOrDefaultAsync(x => x.Username == username && x.PasswordHash == passwordHash);
			}
			else return null;
		}

		public async Task Create(User user)
		{
			if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.PasswordHash))
			{
				throw new ArgumentException("Username and password cannot be empty.");
			}
			if (await _context.Users.AnyAsync(x => x.Username == user.Username))
			{
				throw new InvalidOperationException("Username already exists.");
			}
			user.PasswordSalt = GenerateSalt();
			user.PasswordHash = HashPassword(user.PasswordHash + user.PasswordSalt);
			await _context.Users.AddAsync(user);
			await _context.SaveChangesAsync();
		}

		private string HashPassword(string password)
		{
			using (var sha256 = System.Security.Cryptography.SHA256.Create())
			{
				var bytes = System.Text.Encoding.UTF8.GetBytes(password);
				var hash = sha256.ComputeHash(bytes);
				return Convert.ToBase64String(hash);
			}
		}

		private string GenerateSalt()
		{
			return Guid.NewGuid().ToString();
		}
	}
}
