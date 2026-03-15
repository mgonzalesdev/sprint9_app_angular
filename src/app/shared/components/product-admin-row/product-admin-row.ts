import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@core/models/catalog.model';
import { ProductService } from '@core/services/product';

@Component({
  selector: 'app-product-admin-row',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-admin-row.html',
  styleUrl: './product-admin-row.scss',
})
export class ProductAdminRow {
  private productService = inject(ProductService);
  product = input.required<Product>();
  onDelete = output<number>();

  onDeleteClick() {
    // Para acceder al valor de un input signal se usan paréntesis ()
    this.onDelete.emit(this.product().id);
  }

}
