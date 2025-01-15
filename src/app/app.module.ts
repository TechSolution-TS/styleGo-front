import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { BarberListingComponent } from './barber-listing/barber-listing.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    //modulos do projeto
    HeaderComponent,
    BarberListingComponent,
  ],
  bootstrap: [] // Não bootstrap o AppComponent aqui, pois é standalone
})
export class AppModule {}