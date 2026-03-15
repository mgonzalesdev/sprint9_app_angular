import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@core/models/catalog.model';
import { ProductService } from '@core/services/product';
import { CustomCalendar } from '@shared/components/custom-calendar/custom-calendar';
import { ProductAdminRow } from '@shared/components/product-admin-row/product-admin-row';

@Component({
  selector: 'app-product-admin-list',
  imports: [CommonModule, RouterLink,CustomCalendar, ProductAdminRow],
  templateUrl: './product-admin-list.html',
  styleUrl: './product-admin-list.scss',
})
export class ProductAdminList {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
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

}
