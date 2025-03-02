import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token') || null; 
    }
    return null;
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  saveUserSession(token: string, userUuid: string,  email: string,  password: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userUuid', userUuid);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  getUserUuid(): string | null {
    return localStorage.getItem('userUuid');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  getPassword(): string | null {
    return localStorage.getItem('password');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userUuid');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.href = '/login';
  }
}
