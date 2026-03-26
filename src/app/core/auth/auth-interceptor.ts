import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Si hay token, clonamos la petición y le añadimos el Header
  if (token && token !== 'undefined') {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
  //Falta verificar si la Sesión expirada en el servidor
};

/*import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  const isLoginRequest = req.url.includes('/auth/login');
  let authReq = req;
  // Si hay token, clonamos la petición y le añadimos el Header

  if (token && token !== 'undefined'&& !isLoginRequest) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    //return next(authReq);
  }
  //  return next(req);
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el servidor responde 401, significa que la sesión acabó
      if (error.status === 401) {
        console.warn('⚠️ Sesión expirada en el servidor. Limpiando datos localmente...');
        authService.logout(); // Esto borra LocalStorage, Signal y redirige al login
      }
      return throwError(() => error);
    })
  );
};*/
