import { Component, input } from '@angular/core';
import { Product } from '@core/models/catalog.model';
import { ProductCard } from '@shared/components/product-card/product-card';

@Component({
  selector: 'app-catalog-grid',
  imports: [ProductCard],
  templateUrl: './catalog-grid.html',
  styleUrl: './catalog-grid.scss',
})
export class CatalogGrid {
  products = input.required<Product[]>();
}
