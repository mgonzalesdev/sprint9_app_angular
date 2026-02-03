import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [DatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();

  onClaim() {
    console.log('Producto reservado:', this.product().id);
  }
}
