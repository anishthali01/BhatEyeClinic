namespace BhatEyeClinic.Api.Models;

public sealed class ClinicService
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int DurationMinutes { get; set; }

    public int DisplayOrder { get; set; }
}