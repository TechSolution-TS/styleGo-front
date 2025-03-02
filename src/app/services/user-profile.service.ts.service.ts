import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:8080/v1/api/users';
  private requestServiceUrl = 'http://localhost:8080/v1/api/request-service/user';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getToken();
    if (!token) {
      console.error("Erro: Nenhum token encontrado no localStorage!");
      throw new Error("Usuário não autenticado");
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserByUuid(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uuid}`, { headers: this.getHeaders() });
  }

  getUserServices(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.requestServiceUrl}/${uuid}`, { headers: this.getHeaders() });
  }

  getUserData(uuid: string): Observable<any[]> {
    return forkJoin([
      this.getUserByUuid(uuid),
      this.getUserServices(uuid)
    ]);
  }
}
