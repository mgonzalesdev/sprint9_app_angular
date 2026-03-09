import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product';
import { ProductCard } from '@shared/components/product-card/product-card';
import { CatalogMap } from './components/catalog-map/catalog-map';

@Component({
  selector: 'app-catalog',
  imports: [ProductCard, CatalogMap],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private productService = inject(ProductService);
  // Convertimos el observable a Signal directamente

   viewMode = signal<'grid' | 'map'>('grid');
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
}
