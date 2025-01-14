import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HeaderComponent // Importação do HeaderComponent standalone
  ],
  bootstrap: [] // Não bootstrap o AppComponent aqui, pois é standalone
})
export class AppModule {}