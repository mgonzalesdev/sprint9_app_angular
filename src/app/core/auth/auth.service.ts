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
  private apiUrl = 'http://localhost:3000/auth';

  // Signal para el estado del usuario
  private _currentUser = signal<any | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => !!this._currentUser());

  constructor() {
    this.checkStatus();
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Guardamos el JWT  
        const token = response.accessToken;
        if (token) {
          this.saveSession(token, response.user);
        } else {
          console.error('La API no envió accessToken', response);
        }
      })
    );
  }

  register(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        const token = response.accessToken;
        if (token) {
          this.saveSession(token, response.user);
        }
      })
    );
  }
  
  private saveSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this._currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this.router.navigate(['/catalog']);
  }

  checkStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        this._currentUser.set(JSON.parse(user));
      } catch (e) {
        this.logout(); // Si el JSON está corrupto, limpiamos
      }
    }
  }


}
