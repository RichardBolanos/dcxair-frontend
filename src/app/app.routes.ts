import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FlightsComponent } from './pages/flights/flights.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'flights',
    pathMatch: 'full',
  },
  {
    path: 'flights',
    component: FlightsComponent,
    // canActivate: [isLoggedIn],
    // children: [
    //   { path: '', redirectTo: 'tickets', pathMatch: 'full' },
    // ],
  }
];
