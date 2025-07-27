using backend.Models;

namespace backend.Services
{
    public interface IPartyRequestService
    {
        List<PartyRequest> GetPartyRequests();
        PartyRequest GetPartyById(int id);
        void AddPartyRequest(PartyRequest request);
        void UpdatePartyRequest(PartyRequest request);
        void DeletePartyRequest(int id);
    }
}
