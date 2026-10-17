import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from './api-url';

export interface CreateAppointment {
  fullName: string;
  age: number;
  date: string;
  time: string;
}

export interface AppointmentConfirmation {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentClient {
  private readonly http = inject(HttpClient);

  create(request: CreateAppointment): Observable<AppointmentConfirmation> {
    return this.http.post<AppointmentConfirmation>(`${apiBaseUrl}/appointments`, request);
  }
}