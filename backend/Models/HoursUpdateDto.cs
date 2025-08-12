namespace backend.Models
{
    public class HoursUpdateDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public int SundayId { get; set; }
        public int MondayId { get; set; }
        public int TuesdayId { get; set; }
        public int WednesdayId { get; set; }
        public int ThursdayId { get; set; }
        public int FridayId { get; set; }
        public int SaturdayId { get; set; }
    }
}
