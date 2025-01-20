import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BarberListingComponent } from "./barber-listing/barber-listing.component";
import { RouterOutlet } from '@angular/router';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
  title = 'stylego-front';
}
