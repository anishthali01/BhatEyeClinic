using BhatEyeClinic.Api.Data;
using BhatEyeClinic.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BhatEyeClinic.Api.Controllers;

[ApiController]
[Route("api/clinic-services")]
public sealed class ClinicServicesController(ClinicDbContext database) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<List<ClinicService>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ClinicService>>> GetAll(CancellationToken cancellationToken)
    {
        var services = await database.ClinicServices
            .AsNoTracking()
            .OrderBy(service => service.DisplayOrder)
            .ToListAsync(cancellationToken);

        return Ok(services);
    }
}