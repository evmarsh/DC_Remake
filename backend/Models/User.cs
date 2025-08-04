using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class User
	{
		[Key]
		public required string Username { get; set; }
		public required string Email { get; set; }
		public required string PasswordHash { get; set; }
		public string? PasswordSalt { get; set; }
	}
}
