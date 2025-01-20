import { Routes } from '@angular/router';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { AppComponent } from './app.component';
import { BarberListingComponent } from './barber-listing/barber-listing.component';

export const routes: Routes = [
  { path: 'barber/:id', component: BarberProfileComponent },
  { path: '', component: BarberListingComponent },   // Rota raiz para BarberListingComponent
  { path: 'home', redirectTo: '', pathMatch: 'full' }, // Redireciona /home para /
  { path: '**', redirectTo: '', pathMatch: 'full' }   // Redireciona qualquer outra rota para /
];
