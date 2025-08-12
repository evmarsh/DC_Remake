using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IHoursService
    {
        Task<DbSet<Hours>> GetHoursAsync();
        Task<Hours> GetHoursByIdAsync(int id);
        Task UpdateHoursAsync(Hours hours);
        Task CreateHoursAsync(Hours hours);
        Task DeleteHoursAsync(int id);
    }
}
