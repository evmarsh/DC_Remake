using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class HoursService : IHoursService
    {
        private readonly ApplicationContextDb _context;

        public HoursService(ApplicationContextDb context)
        {
            _context = context;
        }

        public async Task<DbSet<Hours>> GetHoursAsync() =>
            await Task.FromResult(_context.Hours);

        public async Task<Hours> GetHoursByIdAsync(int id) =>
            await _context.Hours
                .Include(h => h.Sunday)
                .Include(h => h.Monday)
                .Include(h => h.Tuesday)
                .Include(h => h.Wednesday)
                .Include(h => h.Thursday)
                .Include(h => h.Friday)
                .Include(h => h.Saturday)
                .FirstOrDefaultAsync(h => h.Id == id);

        public async Task UpdateHoursAsync(Hours hours)
        {
            var existing = await _context.Hours.FirstOrDefaultAsync(h => h.Id == hours.Id);
            if (existing != null)
            {
                existing.IsActive = hours.IsActive;
                existing.SundayId = hours.SundayId;
                existing.MondayId = hours.MondayId;
                existing.TuesdayId = hours.TuesdayId;
                existing.WednesdayId = hours.WednesdayId;
                existing.ThursdayId = hours.ThursdayId;
                existing.FridayId = hours.FridayId;
                existing.SaturdayId = hours.SaturdayId;

                if (hours.IsActive == true)
                {
                    var activeHours = await _context.Hours.FirstOrDefaultAsync(h => h.IsActive && h.Id != hours.Id);
                    if (activeHours != null)
                    {
                        activeHours.IsActive = false;
                    }
                }

                await _context.SaveChangesAsync();
            }
            await Task.CompletedTask;
        }

        public async Task CreateHoursAsync(Hours hours)
        {
            if (hours.Sunday != null)
                _context.Entry(hours.Sunday).State = EntityState.Unchanged;
            if (hours.Monday != null)
                _context.Entry(hours.Monday).State = EntityState.Unchanged;
            if (hours.Tuesday != null)
                _context.Entry(hours.Tuesday).State = EntityState.Unchanged;
            if (hours.Wednesday != null)
                _context.Entry(hours.Wednesday).State = EntityState.Unchanged;
            if (hours.Thursday != null)
                _context.Entry(hours.Thursday).State = EntityState.Unchanged;
            if (hours.Friday != null)
                _context.Entry(hours.Friday).State = EntityState.Unchanged;
            if (hours.Saturday != null)
                _context.Entry(hours.Saturday).State = EntityState.Unchanged;

            _context.Hours.Add(hours);


            if (hours.IsActive == true)
            {
                var activeHours = await _context.Hours.FirstOrDefaultAsync(h => h.IsActive);
                if (activeHours != null)
                {
                    activeHours.IsActive = false;
                }
            }

            await _context.SaveChangesAsync();
            await Task.CompletedTask;
        }

        public async Task DeleteHoursAsync(int id)
        {
            var hours = await _context.Hours.FirstOrDefaultAsync(h => h.Id == id);
            if (hours != null)
            {
                _context.Remove(hours);
                await _context.SaveChangesAsync();
                await Task.CompletedTask;
            }
        }
    }
}
