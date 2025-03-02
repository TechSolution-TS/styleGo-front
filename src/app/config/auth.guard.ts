import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): Observable<boolean> {
    const token = this.storageService.getToken();

    if (!token) {
      console.warn('AuthGuard: Nenhum token encontrado, redirecionando para login.');
      this.router.navigate(['/login']);
      return of(false); // 🚀 Cancela a navegação imediatamente
    }

    return of(true);
  }
}
