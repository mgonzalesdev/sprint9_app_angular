import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el Signal de autenticación es true, permitimos el paso
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no, lo mandamos al login y guardamos a dónde quería ir
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
};