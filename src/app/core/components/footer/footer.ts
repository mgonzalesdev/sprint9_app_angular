import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private authService = inject(AuthService);
  private router = inject(Router);
  handleRegalar() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/manage/new']);
    } else {
      // Opcional: Guardar la ruta actual para volver después del login
      this.router.navigate(['/auth/login']);
    }
  }
}
