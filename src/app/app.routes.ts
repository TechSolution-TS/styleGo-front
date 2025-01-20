import { Routes } from '@angular/router';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'barber/:id', component: BarberProfileComponent },
  { path: '', component: AppComponent},
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
