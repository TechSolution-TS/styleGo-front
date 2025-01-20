import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { BarberProfileComponent } from './app/pages/barber-profile/barber-profile.component';
import { BarberListingComponent } from './app/barber-listing/barber-listing.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'barber/:id', component: BarberProfileComponent },
      { path: '', component: BarberListingComponent },
      //{ path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
});