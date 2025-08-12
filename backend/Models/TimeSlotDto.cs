public class TimeSlotDto
{
    public int Id { get; set; }
    public string OpenTime { get; set; }
    public string CloseTime { get; set; }
}

public class HoursReadDto
{
    public int Id { get; set; }
    public bool IsActive { get; set; }
    public TimeSlotDto Sunday { get; set; }
    public TimeSlotDto Monday { get; set; }
    public TimeSlotDto Tuesday { get; set; }
    public TimeSlotDto Wednesday { get; set; }
    public TimeSlotDto Thursday { get; set; }
    public TimeSlotDto Friday { get; set; }
    public TimeSlotDto Saturday { get; set; }
}
