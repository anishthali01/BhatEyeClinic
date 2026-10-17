import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentClient } from '../appointment.client';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-appointment-page',
  templateUrl: './appointment.page.html',
})
export class AppointmentPage {
  private readonly appointmentClient = inject(AppointmentClient);
  private readonly currentDate = new Date();

  protected readonly minDate = [
    this.currentDate.getFullYear(),
    String(this.currentDate.getMonth() + 1).padStart(2, '0'),
    String(this.currentDate.getDate()).padStart(2, '0'),
  ].join('-');

  protected readonly form = new FormGroup({
    fullName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120), Validators.pattern(/.*\S.*/)],
    }),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    time: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly isSubmitting = signal(false);
  protected readonly confirmation = signal('');
  protected readonly errorMessage = signal('');

  protected submit(): void {
    this.confirmation.set('');
    this.errorMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fullName, age, date, time } = this.form.getRawValue();
    if (age === null) {
      return;
    }

    this.isSubmitting.set(true);
    this.appointmentClient.create({ fullName: fullName.trim(), age, date, time }).subscribe({
      next: (result) => {
        this.confirmation.set(result.message);
        this.form.reset();
        this.isSubmitting.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(
          error.status === 409
            ? 'That appointment time is no longer available. Please choose another time.'
            : 'We could not submit your appointment. Please try again.',
        );
        this.isSubmitting.set(false);
      },
    });
  }
}