import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicServiceClient } from '../clinic-service.client';
import { ClinicService } from '../clinic-service.model';

@Component({
  imports: [RouterLink],
  selector: 'app-services-page',
  templateUrl: './services.page.html',
})
export class ServicesPage implements OnInit {
  private readonly clinicServiceClient = inject(ClinicServiceClient);

  protected readonly services = signal<ClinicService[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly hasLoadError = signal(false);

  ngOnInit(): void {
    this.clinicServiceClient.getAll().subscribe({
      next: (services) => {
        this.services.set(services);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasLoadError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}