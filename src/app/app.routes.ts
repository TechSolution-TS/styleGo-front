import { Routes } from '@angular/router';
import { BarberListingComponent } from './barber-listing/barber-listing.component';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { PriceTableComponent } from './pages/price-table/price-table.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { AuthGuard } from '../app/config/auth.guard';

export const routes: Routes = [
  { path: 'barber/:id', component: BarberProfileComponent, canActivate: [AuthGuard] },
  { path: 'user-profile/:id', component: ClientProfileComponent, canActivate: [AuthGuard] },
  { path: 'prices', component: PriceTableComponent, canActivate: [AuthGuard] },
  { path: 'barber-listing', component: BarberListingComponent, canActivate: [AuthGuard] },  
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegistrationComponent }, 
  { path: 'home', redirectTo: '', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login', pathMatch: 'full' } 
];
