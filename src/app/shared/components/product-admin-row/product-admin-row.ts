import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@core/models/catalog.model';
import { ProductService } from '@core/services/product.service';
import { StatusColorPipe } from '@shared/pipes/status-color-pipe';

@Component({
  selector: 'app-product-admin-row',
  imports: [CommonModule,RouterLink,StatusColorPipe],
  templateUrl: './product-admin-row.html',
  styleUrl: './product-admin-row.scss',
})
export class ProductAdminRow {
  private productService = inject(ProductService);
  product = input.required<Product>();
  onDelete = output<number>();

  onDeleteClick() {
    this.onDelete.emit(this.product().id);
  }

}
