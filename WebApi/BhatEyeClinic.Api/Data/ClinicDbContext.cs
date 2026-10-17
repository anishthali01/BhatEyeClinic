using BhatEyeClinic.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BhatEyeClinic.Api.Data;

public sealed class ClinicDbContext(DbContextOptions<ClinicDbContext> options) : DbContext(options)
{
    public DbSet<ClinicService> ClinicServices => Set<ClinicService>();

    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>()
            .HasIndex(appointment => appointment.AppointmentAt)
            .IsUnique();
    }
}