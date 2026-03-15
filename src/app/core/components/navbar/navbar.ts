import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  public authService = inject(AuthService);
  private router = inject(Router);

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
  onLogout() {
    if (confirm('¿Quieres cerrar tu sesión?')) {
      this.authService.logout();
      this.isMenuOpen.set(false); // Cerramos el menú móvil por si acaso
    }
  }
  handlePublicar() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/manage/new']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  goToManageList() {
    this.router.navigate(['/manage/list']);
  }
}
