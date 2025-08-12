using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class TimeSlot
    {
        public int Id { get; set; }
        public required string OpenTime { get; set; }
        public required string CloseTime { get; set; }
    }
}
