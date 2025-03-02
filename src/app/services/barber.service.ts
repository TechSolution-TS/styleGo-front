import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  private apiUrl = 'http://localhost:8080/v1/api/barbers';
  private authUrl = 'http://localhost:8080/v1/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password });
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  getBarbers(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.apiUrl, { headers });
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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userUuid');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}
