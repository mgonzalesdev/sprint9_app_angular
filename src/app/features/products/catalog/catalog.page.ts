import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product';
import { ProductCard } from '@shared/components/product-card/product-card';
import { CatalogMap } from './components/catalog-map/catalog-map';

@Component({
  selector: 'app-catalog',
  imports: [ProductCard, CatalogMap],
  templateUrl: './catalog.page.html',
  styleUrl: './catalog.page.scss',
})
export class Catalog {
  private productService = inject(ProductService);

  viewMode = signal<'grid' | 'map'>('grid');
  allProducts = toSignal(this.productService.getProducts(), { initialValue: [] });

  products = computed(() =>
    this.allProducts().filter(p => p.status.name !== 'Entregado')
  );

}
