import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  public authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  showLogoutModal = signal(false);

  isMenuOpen = signal(false);

  onLogout() {
    this.showLogoutModal.set(true);
  }

  confirmLogout() {
    this.showLogoutModal.set(false);
    this.authService.logout();
    this.isMenuOpen.set(false);
  }

  searchControl = new FormControl('');
  ngOnInit() {
    // Escuchamos el input con un retraso 
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.router.navigate(['/catalog'], {
        queryParams: { search: term || null },
        queryParamsHandling: 'merge'
      });
    });

    this.route.queryParams.subscribe(params => {
      if (params['search'] !== this.searchControl.value) {
        this.searchControl.setValue(params['search'] || '', { emitEvent: false });
      }
    });
  }

  private performSearch(term: string) {
    this.router.navigate(['/catalog'], {
      queryParams: { search: term || null }, // Si está vacío, quita el parámetro
      queryParamsHandling: 'merge' //  MANTIENE LA CATEGORÍA DEL ASIDE
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
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
