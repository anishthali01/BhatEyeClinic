import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home-page',
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit, OnDestroy {
  protected readonly slides = [
    { src: 'image/eye-exam-clinic.jpg', label: 'A patient during an eye examination' },
    { src: 'image/slit-lamp-exam.jpg', label: 'A patient receiving a slit-lamp eye exam' },
    { src: 'image/eye-exam-consultation.jpg', label: 'An optometrist examining a patient' },
  ];

  protected readonly activeSlide = signal(0);
  private rotationTimer?: number;

  ngOnInit(): void {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    if (!prefersReducedMotion) {
      this.startRotation();
    }
  }

  ngOnDestroy(): void {
    if (this.rotationTimer !== undefined) {
      window.clearInterval(this.rotationTimer);
    }
  }

  private startRotation(): void {
    this.rotationTimer = window.setInterval(() => {
      this.activeSlide.update((index) => (index + 1) % this.slides.length);
    }, 7000);
  }
}