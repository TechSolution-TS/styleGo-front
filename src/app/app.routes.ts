import { Routes } from '@angular/router';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { AppComponent } from './app.component';
import { BarberListingComponent } from './barber-listing/barber-listing.component';

export const routes: Routes = [
  { path: 'barber/:id', component: BarberProfileComponent },
  { path: '', component: BarberListingComponent },  
  { path: 'home', redirectTo: '', pathMatch: 'full' }, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
