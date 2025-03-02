import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private userApiUrl = 'http://localhost:8080/v1/api/users/create';
  private barberApiUrl = 'http://localhost:8080/v1/api/barbers/create';

  constructor(private http: HttpClient) {}

  registerClient(userData: any): Observable<any> {
    return this.http.post<any>(this.userApiUrl, userData);
  }

  registerBarber(barberData: any): Observable<any> {
    return this.http.post<any>(this.barberApiUrl, barberData);
  }
}
