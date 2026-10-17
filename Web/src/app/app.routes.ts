import { Routes } from '@angular/router';
import { AboutPage } from './pages/about.page';
import { AppointmentPage } from './pages/appointment.page';
import { CarePage } from './pages/care.page';
import { HomePage } from './pages/home.page';
import { ServicesPage } from './pages/services.page';

export const routes: Routes = [
	{ path: '', component: HomePage, title: 'Dr Bhat Eye Clinic' },
	{ path: 'care', component: CarePage, title: 'Our Care | Dr Bhat Eye Clinic' },
	{ path: 'about', component: AboutPage, title: 'About | Dr Bhat Eye Clinic' },
	{ path: 'services', component: ServicesPage, title: 'Services | Dr Bhat Eye Clinic' },
	{ path: 'appointment', component: AppointmentPage, title: 'Book an Appointment | Dr Bhat Eye Clinic' },
	{ path: '**', redirectTo: '' },
];
