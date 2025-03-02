import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = true;


  constructor(private router: Router, private storageService: StorageService) { }

  logout() {
    console.log("Usuário deslogado");
    this.isLoggedIn = false; 
    this.storageService.logout();
  }

  goToLogin(){
    this.router.navigate([`/login`]);
  }

  goToUserProfile() {
    const userUuid = this.storageService.getUserUuid();
  
    if (userUuid) {
      this.router.navigate(['/user-profile', userUuid]);
    } else {
      console.warn('Nenhum UUID encontrado. Redirecionando para login.');
      this.router.navigate(['/login']);
    }
  }
  

  goToHome(){
    this.router.navigate([`/barber-listing`]);
  }

}