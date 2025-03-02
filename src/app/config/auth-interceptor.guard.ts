import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BarberService } from '../services/barber.service';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const barberService = inject(BarberService);

  const token = storageService.getToken();

  let clonedRequest = req;
  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 403) {
        console.warn('Token expirado. Tentando renovar...');

        const email = storageService.getEmail();
        const password = storageService.getPassword();

        if (email && password) {
          return barberService.login(email, password).pipe(
            switchMap((response) => {
              console.log('Novo token obtido:', response.token);

              storageService.saveUserSession(response.token, response.userUuid, email, password);

              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`
                }
              });

              return next(newRequest);
            }),
            catchError((err) => {
              console.error('Erro ao renovar token:', err);
              storageService.logout();
              return throwError(() => err);
            })
          );
        } else {
          console.warn('Email e senha não encontrados no storage. Redirecionando para login.');
          storageService.logout();
        }
      }
      return throwError(() => error);
    })
  );
};
