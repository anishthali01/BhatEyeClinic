namespace BhatEyeClinic.Api.Models;

public sealed class Appointment
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public int Age { get; set; }

    public DateTime AppointmentAt { get; set; }
}