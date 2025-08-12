namespace backend.Models
{
    public class Hours
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public required int SundayId { get; set; }
        public required int MondayId { get; set; }
        public required int TuesdayId { get; set; }
        public required int WednesdayId { get; set; }
        public required int ThursdayId { get; set; }
        public required int FridayId { get; set; }
        public required int SaturdayId { get; set; }
        public TimeSlot? Sunday { get; set; }
        public TimeSlot? Monday { get; set; }
        public TimeSlot? Tuesday { get; set; }
        public TimeSlot? Wednesday { get; set; }
        public TimeSlot? Thursday { get; set; }
        public TimeSlot? Friday { get; set; }
        public TimeSlot? Saturday { get; set; }
    }
}
