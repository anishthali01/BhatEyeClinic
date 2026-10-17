using System.ComponentModel.DataAnnotations;

namespace BhatEyeClinic.Api.Models;

public sealed class CreateAppointmentRequest
{
	[Required]
	[StringLength(120, MinimumLength = 2)]
	[RegularExpression(@".*\S.*")]
	public string FullName { get; set; } = string.Empty;

	[Required]
	[Range(0, 120)]
	public int? Age { get; set; }

	[Required]
	public DateOnly? Date { get; set; }

	[Required]
	public TimeOnly? Time { get; set; }
}