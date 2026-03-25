import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Product } from '@core/models/catalog.model';
import { ProductService } from '@core/services/product.service';
import { CustomCalendar } from '@shared/components/custom-calendar/custom-calendar';
import { ProductAdminRow } from '@shared/components/product-admin-row/product-admin-row';

@Component({
  selector: 'app-product-admin-list',
  imports: [CommonModule, ProductAdminRow],
  templateUrl: './product-admin-list.html',
  styleUrl: './product-admin-list.scss',
})
export class ProductAdminList {
  private router = inject(Router);
  private productService = inject(ProductService);
  authService = inject(AuthService);

  products = signal<Product[]>([]);
  isLoading = signal(true);
  filterSelected = signal<string>('Todos');

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    // this.productService.getProducts().subscribe({
    this.productService.getProductByUser().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este regalo? 🗑️')) {
      this.productService.delete(id).subscribe(
        () => {
          this.products.update(prev => prev.filter(p => p.id !== id));
        }
      );
    }
  }

  filteredProducts = computed(() => {
    const activeFilter = this.filterSelected();
    if (activeFilter === 'Todos')
      return this.products();

    return this.products().filter(p => p.status.name === activeFilter);
  });

  counts = computed(() => {
    const list = this.products();
    return {
      Todos: list.length,
      Disponible: list.filter(p => p.status.name === 'Disponible').length,
      Reservado: list.filter(p => p.status.name === 'Reservado').length,
      Entregado: list.filter(p => p.status.name === 'Entregado').length,
    };
  });

  setFilter(statusProduct: string) {
    console.log('Cambiando filtro a:', statusProduct);
    this.filterSelected.set(statusProduct);
  }

  handleNew() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/manage/new']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
