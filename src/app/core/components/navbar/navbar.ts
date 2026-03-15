import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
   public authService = inject(AuthService);
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
}
