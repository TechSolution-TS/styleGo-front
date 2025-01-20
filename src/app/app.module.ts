import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { BarberListingComponent } from './barber-listing/barber-listing.component';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HeaderComponent,
    BarberListingComponent,
    BarberProfileComponent,
    AppRoutingModule,
  ],
  bootstrap: [],
  exports: []
})
export class AppModule {}