import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarberProfileComponent } from './pages/barber-profile/barber-profile.component';
import { BarberListingComponent } from './barber-listing/barber-listing.component';

const routes: Routes = [
  { path: 'barber/:id', component: BarberProfileComponent },
  { path: '', component: BarberListingComponent }, // Rota para a listagem (opcional)
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redireciona para listagem caso não encontre a rota
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { 
      constructor() {
        console.log("AppRoutingModule carregado");
        console.log("Rotas:", routes);
      }

}
