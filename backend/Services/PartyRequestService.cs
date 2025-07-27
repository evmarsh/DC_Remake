using backend.Models;

namespace backend.Services
{
    public class PartyRequestService : IPartyRequestService
    {
        private readonly IPartyRequestRepository _repository;

        public PartyRequestService (IPartyRequestRepository repository)
        {
            _repository = repository;
        }

        public List<PartyRequest> GetPartyRequests ()
        {
            try
            {
                return _repository.GetPartyRequests();
            }
            catch
            {
                throw;
            }
        }

        public PartyRequest GetPartyById (int id)
        {
            try
            {
                return _repository.GetPartyRequestById(id);
            }
            catch
            {

                throw;
            }
        }

        public void AddPartyRequest (PartyRequest request)
        {
            _repository.AddPartyRequest(request);
        }

        public void UpdatePartyRequest (PartyRequest request)
        {
            try
            {
                _repository.UpdatePartyRequest(request);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeletePartyRequest(int id)
        {
            try
            {
                _repository.DeletePartyRequest(id);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
