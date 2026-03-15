import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/auth'; // URL de tu NestJS

  // Signal para el estado del usuario
  private _currentUser = signal<any | null>(null);

  // Selectores públicos
  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => {
    return !!this._currentUser() || !!localStorage.getItem('token');
  });

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Guardamos el JWT que viene de NestJS
        localStorage.setItem('token', response.accessToken);
        this._currentUser.set(response.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this.router.navigate(['/catalog']);
  }

  // Método para recuperar sesión al recargar la página (Faltaría un endpoint /auth/me en Nest)
  checkStatus() {
    const token = localStorage.getItem('token');
    if (!token) return;
    // Aquí podrías validar el token con el servidor
  }
  // Opcional: Al arrancar la app, podrías validar si ya hay un token
  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías setear un usuario básico o llamar a un endpoint /me
      this._currentUser.set({ hasToken: true });
    }
  }
}
