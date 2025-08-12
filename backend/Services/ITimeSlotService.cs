using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface ITimeSlotService
    {
        Task CreateTimeSlot (TimeSlot slot);
        Task<DbSet<TimeSlot>> GetTimeSlotsAsync();
        Task<TimeSlot> GetTimeSlotById(int id);
        Task UpdateTimeSlot(TimeSlot slot);
        Task DeleteTimeSlot(int id);
    }
}
