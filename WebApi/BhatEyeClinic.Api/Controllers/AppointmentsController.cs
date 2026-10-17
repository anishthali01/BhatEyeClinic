using BhatEyeClinic.Api.Data;
using BhatEyeClinic.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace BhatEyeClinic.Api.Controllers;

[ApiController]
[Route("api/appointments")]
public sealed class AppointmentsController(ClinicDbContext database) : ControllerBase
{
	[HttpPost]
	[ProducesResponseType(StatusCodes.Status201Created)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
	[ProducesResponseType(StatusCodes.Status409Conflict)]
	public async Task<IActionResult> Create(
		[FromBody] CreateAppointmentRequest request,
		CancellationToken cancellationToken)
	{
		var appointmentAt = request.Date!.Value.ToDateTime(request.Time!.Value);
		if (appointmentAt <= DateTime.Now)
		{
			return BadRequest(new ProblemDetails
			{
				Title = "Choose a future date and time for your appointment.",
				Status = StatusCodes.Status400BadRequest
			});
		}

		if (await database.Appointments.AnyAsync(
			appointment => appointment.AppointmentAt == appointmentAt,
			cancellationToken))
		{
			return Conflict(new ProblemDetails
			{
				Title = "That appointment time is already booked. Please choose another time.",
				Status = StatusCodes.Status409Conflict
			});
		}

		var appointment = new Appointment
		{
			FullName = request.FullName.Trim(),
			Age = request.Age!.Value,
			AppointmentAt = appointmentAt
		};

		database.Appointments.Add(appointment);
		try
		{
			await database.SaveChangesAsync(cancellationToken);
		}
		catch (DbUpdateException exception) when (exception.InnerException is SqliteException { SqliteErrorCode: 19 })
		{
			return Conflict(new ProblemDetails
			{
				Title = "That appointment time is already booked. Please choose another time.",
				Status = StatusCodes.Status409Conflict
			});
		}

		return StatusCode(StatusCodes.Status201Created, new
		{
			message = "Your appointment request has been received."
		});
	}
}