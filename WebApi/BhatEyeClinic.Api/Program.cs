using System.Text.Json;
using BhatEyeClinic.Api.Data;
using BhatEyeClinic.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
	options.AddPolicy("AngularFrontend", policy =>
	{
		policy.WithOrigins("http://localhost:4200", "https://anishthali01.github.io")
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});

var dataDirectory = Path.Combine(builder.Environment.ContentRootPath, "Data");
Directory.CreateDirectory(dataDirectory);
var databasePath = Path.Combine(dataDirectory, "bhat-eye-clinic.db");
builder.Services.AddDbContext<ClinicDbContext>(options =>
	options.UseSqlite($"Data Source={databasePath}"));

var app = builder.Build();

await using (var scope = app.Services.CreateAsyncScope())
{
	var database = scope.ServiceProvider.GetRequiredService<ClinicDbContext>();
	await database.Database.EnsureCreatedAsync();
	await database.Database.ExecuteSqlRawAsync("""
		CREATE TABLE IF NOT EXISTS "Appointments" (
			"Id" INTEGER NOT NULL CONSTRAINT "PK_Appointments" PRIMARY KEY AUTOINCREMENT,
			"FullName" TEXT NOT NULL,
			"Age" INTEGER NOT NULL,
			"AppointmentAt" TEXT NOT NULL
		);
		""");
	await database.Database.ExecuteSqlRawAsync("""
		CREATE UNIQUE INDEX IF NOT EXISTS "IX_Appointments_AppointmentAt"
		ON "Appointments" ("AppointmentAt");
		""");

	if (!await database.ClinicServices.AnyAsync())
	{
		var seedPath = Path.Combine(app.Environment.ContentRootPath, "Data", "clinic-services.json");
		var seedJson = await File.ReadAllTextAsync(seedPath);
		var services = JsonSerializer.Deserialize<List<ClinicService>>(
			seedJson,
			new JsonSerializerOptions(JsonSerializerDefaults.Web)) ?? [];

		database.ClinicServices.AddRange(services);
		await database.SaveChangesAsync();
	}
}

if (!app.Environment.IsDevelopment())
{
	app.UseHttpsRedirection();
}

app.UseCors("AngularFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
