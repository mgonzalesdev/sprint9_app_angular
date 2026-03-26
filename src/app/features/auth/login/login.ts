import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  showPassword = false;

  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-0._%+-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    this.errorMessage.set(null);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        console.log('Login exitoso en NestJS');
        this.router.navigate(['/manage/list']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Credenciales incorrectas ❌');
      }
    });
  }
}
