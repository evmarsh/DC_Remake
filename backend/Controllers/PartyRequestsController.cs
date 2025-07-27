using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartyRequestsController : ControllerBase
    {
        private readonly IPartyRequestService _service;

        public PartyRequestsController(IPartyRequestService service)
        {
            _service = service;
        }

        // GET: api/PartyRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartyRequest>>> GetpartyRequests()
        {
            return await _service.GetPartyRequestsAsync();
        }

        // GET: api/PartyRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartyRequest>> GetPartyRequest(int id)
        {
            var partyRequest = await _service.GetPartyById(id);

            if (partyRequest == null)
            {
                return NotFound();
            }

            return partyRequest;
        }

        // PUT: api/PartyRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartyRequest(int id, PartyRequest partyRequest)
        {
            if (id != partyRequest.Id)
            {
                return BadRequest();
            }

            try
            {
                await _service.UpdatePartyRequest(partyRequest);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/PartyRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PartyRequest>> PostPartyRequest(PartyRequest partyRequest)
        {
            _service.CreatePartyRequest(partyRequest);

            return CreatedAtAction("GetPartyRequest", new { id = partyRequest.Id }, partyRequest);
        }

        // DELETE: api/PartyRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePartyRequest(int id)
        {
            var partyRequest = await _service.GetPartyById(id);
            if (partyRequest == null)
            {
                return NotFound();
            }

            await _service.DeletePartyRequest(id);

            return NoContent();
        }
    }
}
