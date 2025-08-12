using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TimeSlotService : ITimeSlotService
    {
        private readonly ApplicationContextDb _context;

        public TimeSlotService(ApplicationContextDb context)
        {
            _context = context;
        }

        public async Task CreateTimeSlot(TimeSlot slot)
        {
            await _context.AddAsync(slot);
            await _context.SaveChangesAsync();
            await Task.CompletedTask;
        }

        public async Task<DbSet<TimeSlot>> GetTimeSlotsAsync() =>
            await Task.FromResult(_context.TimeSlots);

        public async Task<TimeSlot> GetTimeSlotById(int id) =>
            await _context.TimeSlots.FirstOrDefaultAsync(x => x.Id == id);

        public async Task UpdateTimeSlot(TimeSlot slot)
        {
            var existing = await _context.TimeSlots.FirstOrDefaultAsync(p => p.Id == slot.Id);

            if (existing != null)
            {
                existing.OpenTime = slot.OpenTime;
                existing.CloseTime = slot.CloseTime;
                await _context.SaveChangesAsync();
            }

            await Task.CompletedTask;
        }

        public async Task DeleteTimeSlot(int id)
        {
            var slot = await _context.TimeSlots.FirstOrDefaultAsync(p => p.Id == id);
            if (slot != null)
            {
                _context.Remove(slot);
                await _context.SaveChangesAsync();
                await Task.CompletedTask;
            }
        }
    }
}
