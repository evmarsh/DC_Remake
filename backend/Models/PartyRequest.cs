namespace backend.Models
{
    public class PartyRequest
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email {  get; set; } = string.Empty;
        public string PhoneNumber {  get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int NumPeople { get; set; }
        public string Location { get; set; } = string.Empty;
        public string? Comments { get; set; } 
    }
}
