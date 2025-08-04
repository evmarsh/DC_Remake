using backend.Models;

namespace backend.Services
{
	public interface IUserService
	{
		Task<User> Authenticate(string username, string password);
		Task Create(User user);
	}
}
