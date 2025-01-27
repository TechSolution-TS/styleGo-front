import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = true; // Defina como true se o usuário estiver logado

  constructor(private router: Router) { }

  logout() {
    // Implemente a lógica de logout aqui
    console.log("Usuário deslogado");
    this.isLoggedIn = false; // Atualiza o estado de login
  }

  goToLogin(){
    this.router.navigate([`/login`]);
  }

  goToUserProfile() {
    this.router.navigate(['/user-profile/1']); // Rota para o perfil do usuário
  }

  goToHome(){
    this.router.navigate([`/home`]);
  }

}