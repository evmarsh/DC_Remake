using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
	public class PartyRequestService : IPartyRequestService
	{
		private readonly ApplicationContextDb _context;

		public PartyRequestService (ApplicationContextDb context)
		{
			_context = context;
		}

		public async Task CreatePartyRequest (PartyRequest request)
		{
			await _context.AddAsync(request);
			await _context.SaveChangesAsync();
			await Task.CompletedTask;
		}

		public async Task<DbSet<PartyRequest>> GetPartyRequestsAsync() =>
			await Task.FromResult(_context.partyRequests);

		public async Task<PartyRequest> GetPartyById(int id) =>
			await _context.partyRequests.FirstOrDefaultAsync(x => x.Id == id);

		public async Task UpdatePartyRequest (PartyRequest request)
		{
			var existing = await _context.partyRequests.FirstOrDefaultAsync(p => p.Id == request.Id);

			if (existing != null)
			{
				_context.Remove(request);
				await _context.AddAsync(request);
				await _context.SaveChangesAsync();
			}
			await Task.CompletedTask;
		}

		public async Task DeletePartyRequest(int id)
		{
			var request = await _context.partyRequests.FirstOrDefaultAsync(p => p.Id == id);

			if (request != null)
			{
				_context.Remove(request);
				await _context.SaveChangesAsync();
				await Task.CompletedTask;
			}


		}
	}
}
