import { Routes } from '@angular/router';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { AppComponent } from './app.component';
import { BarberListingComponent } from './barber-listing/barber-listing.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';

export const routes: Routes = [
  { path: 'barber/:id', component: BarberProfileComponent },
  { path: '', component: BarberListingComponent },  
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
