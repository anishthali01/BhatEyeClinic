import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClinicService } from './clinic-service.model';

@Injectable({ providedIn: 'root' })
export class ClinicServiceClient {
  private readonly http = inject(HttpClient);

  getAll(): Observable<ClinicService[]> {
    return this.http.get<ClinicService[]>('http://localhost:5021/api/clinic-services');
  }
}