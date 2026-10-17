import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter(routes)],
    })
      .compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('shows distinct content on each primary route', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    const getHeading = () => (fixture.nativeElement as HTMLElement).querySelector('main h1')?.textContent;

    expect(getHeading()).toContain('See well.');

    await router.navigateByUrl('/care');
    fixture.detectChanges();
    expect(getHeading()).toContain('Care that starts');

    await router.navigateByUrl('/about');
    fixture.detectChanges();
    expect(getHeading()).toContain('Dr Bhat Eye Clinic.');

    await router.navigateByUrl('/services');
    fixture.detectChanges();
    httpTesting.expectOne('http://localhost:5021/api/clinic-services').flush([
      { id: 1, name: 'Comprehensive Eye Exam', description: 'A routine assessment of vision and overall eye health.', durationMinutes: 45, displayOrder: 1 },
    ]);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Comprehensive Eye Exam');

    await router.navigateByUrl('/appointment');
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    const setInput = (id: string, value: string) => {
      const input = page.querySelector<HTMLInputElement>(`#${id}`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };

    setInput('full-name', 'Jane Example');
    setInput('age', '42');
    setInput('appointment-date', '2099-01-01');
    setInput('appointment-time', '10:30');
    page.querySelector('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const appointmentRequest = httpTesting.expectOne('http://localhost:5021/api/appointments');
    expect(appointmentRequest.request.method).toBe('POST');
    expect(appointmentRequest.request.body).toEqual({
      fullName: 'Jane Example',
      age: 42,
      date: '2099-01-01',
      time: '10:30',
    });
    appointmentRequest.flush({ message: 'Your appointment request has been received.' }, { status: 201, statusText: 'Created' });
    fixture.detectChanges();
    expect(page.textContent).toContain('Your appointment request has been received.');
  });
});
