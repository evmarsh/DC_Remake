using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
	public interface IPartyRequestService
	{
		Task CreatePartyRequest(PartyRequest request);
		Task<DbSet<PartyRequest>> GetPartyRequestsAsync();
		Task<PartyRequest> GetPartyById(int id);
		Task UpdatePartyRequest(PartyRequest request);
		Task DeletePartyRequest(int id);
	}
}
