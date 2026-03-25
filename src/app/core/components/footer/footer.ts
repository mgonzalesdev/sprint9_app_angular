import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
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
      this.router.navigate(['/auth/login']);
    }
  }
}
