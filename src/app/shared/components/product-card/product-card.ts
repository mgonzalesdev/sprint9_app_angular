import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@core/models/catalog.model';
import { CategoryIconPipe } from '@shared/pipes/category-icon-pipe';

@Component({
  selector: 'app-product-card',
  imports: [DatePipe,RouterLink,CategoryIconPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();

  onClaim() {
    console.log('Producto reservado:', this.product().id);
  }
}
