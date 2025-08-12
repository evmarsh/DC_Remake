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
    public class HoursController : ControllerBase
    {
        private readonly IHoursService _hoursService;

        public HoursController(IHoursService hoursService)
        {
            _hoursService = hoursService;
        }

        // GET: api/Hours
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HoursReadDto>>> GetHours()
        {
            // Ensure you eagerly load the related TimeSlot entities
            var hoursList = await _hoursService.GetHoursAsync();
            var hoursWithSlots = await hoursList
                .Include(h => h.Sunday)
                .Include(h => h.Monday)
                .Include(h => h.Tuesday)
                .Include(h => h.Wednesday)
                .Include(h => h.Thursday)
                .Include(h => h.Friday)
                .Include(h => h.Saturday)
                .ToListAsync();

            var dtoList = hoursWithSlots.Select(hours => new HoursReadDto
            {
                Id = hours.Id,
                IsActive = hours.IsActive,
                Sunday = hours.Sunday == null ? null : new TimeSlotDto
                {
                    Id = hours.Sunday.Id,
                    OpenTime = hours.Sunday.OpenTime,
                    CloseTime = hours.Sunday.CloseTime
                },
                Monday = hours.Monday == null ? null : new TimeSlotDto
                {
                    Id = hours.Monday.Id,
                    OpenTime = hours.Monday.OpenTime,
                    CloseTime = hours.Monday.CloseTime
                },
                Tuesday = hours.Tuesday == null ? null : new TimeSlotDto
                {
                    Id = hours.Tuesday.Id,
                    OpenTime = hours.Tuesday.OpenTime,
                    CloseTime = hours.Tuesday.CloseTime
                },
                Wednesday = hours.Wednesday == null ? null : new TimeSlotDto
                {
                    Id = hours.Wednesday.Id,
                    OpenTime = hours.Wednesday.OpenTime,
                    CloseTime = hours.Wednesday.CloseTime
                },
                Thursday = hours.Thursday == null ? null : new TimeSlotDto
                {
                    Id = hours.Thursday.Id,
                    OpenTime = hours.Thursday.OpenTime,
                    CloseTime = hours.Thursday.CloseTime
                },
                Friday = hours.Friday == null ? null : new TimeSlotDto
                {
                    Id = hours.Friday.Id,
                    OpenTime = hours.Friday.OpenTime,
                    CloseTime = hours.Friday.CloseTime
                },
                Saturday = hours.Saturday == null ? null : new TimeSlotDto
                {
                    Id = hours.Saturday.Id,
                    OpenTime = hours.Saturday.OpenTime,
                    CloseTime = hours.Saturday.CloseTime
                }
            }).ToList();

            return dtoList;
        }

        // GET: api/Hours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HoursReadDto>> GetHours(int id)
        {
            var hours = await _hoursService.GetHoursByIdAsync(id);

            if (hours == null)
                return NotFound();

            var dto = new HoursReadDto
            {
                Id = hours.Id,
                IsActive = hours.IsActive,
                Sunday = hours.Sunday == null ? null : new TimeSlotDto
                {
                    Id = hours.Sunday.Id,
                    OpenTime = hours.Sunday.OpenTime,
                    CloseTime = hours.Sunday.CloseTime
                },
                Monday = hours.Monday == null ? null : new TimeSlotDto
                {
                    Id = hours.Monday.Id,
                    OpenTime = hours.Monday.OpenTime,
                    CloseTime = hours.Monday.CloseTime
                },
                Tuesday = hours.Tuesday == null ? null : new TimeSlotDto
                {
                    Id = hours.Monday.Id,
                    OpenTime = hours.Monday.OpenTime,
                    CloseTime = hours.Monday.CloseTime
                },
                Wednesday = hours.Wednesday == null ? null : new TimeSlotDto
                {
                    Id = hours.Wednesday.Id,
                    OpenTime = hours.Wednesday.OpenTime,
                    CloseTime = hours.Wednesday.CloseTime
                },
                Thursday = hours.Thursday == null ? null : new TimeSlotDto
                {
                    Id = hours.Thursday.Id,
                    OpenTime = hours.Thursday.OpenTime,
                    CloseTime = hours.Thursday.CloseTime
                },
                Friday = hours.Friday == null ? null : new TimeSlotDto
                {
                    Id = hours.Friday.Id,
                    OpenTime = hours.Friday.OpenTime,
                    CloseTime = hours.Friday.CloseTime
                },
                Saturday = hours.Saturday == null ? null : new TimeSlotDto
                {
                    Id = hours.Saturday.Id,
                    OpenTime = hours.Saturday.OpenTime,
                    CloseTime = hours.Saturday.CloseTime
                }
            };

            return dto;
        }

        // PUT: api/Hours/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHours(int id, HoursUpdateDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var hours = new Hours
                {
                    Id = dto.Id,
                    IsActive = dto.IsActive,
                    SundayId = dto.SundayId,
                    MondayId = dto.MondayId,
                    TuesdayId = dto.TuesdayId,
                    WednesdayId = dto.WednesdayId,
                    ThursdayId = dto.ThursdayId,
                    FridayId = dto.FridayId,
                    SaturdayId = dto.SaturdayId
                };
                await _hoursService.UpdateHoursAsync(hours);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Hours
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Hours>> PostHours(HoursCreateDto dto)
        {
            var hours = new Hours
            {
                IsActive = dto.IsActive,
                SundayId = dto.SundayId,
                MondayId = dto.MondayId,
                TuesdayId = dto.TuesdayId,
                WednesdayId = dto.WednesdayId,
                ThursdayId = dto.ThursdayId,
                FridayId = dto.FridayId,
                SaturdayId = dto.SaturdayId
                // Do not set navigation properties here
            };

            await _hoursService.CreateHoursAsync(hours);

            return CreatedAtAction("GetHours", new { id = hours.Id }, hours);
        }


        // DELETE: api/Hours/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHours(int id)
        {
            var hours = await _hoursService.GetHoursByIdAsync(id);
            if (hours == null)
            {
                return NotFound();
            }

            await _hoursService.DeleteHoursAsync(id);

            return NoContent();
        }
    }
}
