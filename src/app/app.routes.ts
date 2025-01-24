import { Routes } from '@angular/router';
import { BarberListingComponent } from './barber-listing/barber-listing.component';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { PriceTableComponent } from './pages/price-table/price-table.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';

export const routes: Routes = [
  { path: 'barber/:id', component: BarberProfileComponent },
  { path: 'prices', component: PriceTableComponent },
  { path: '', component: BarberListingComponent },  
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
