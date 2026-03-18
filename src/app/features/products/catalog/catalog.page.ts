import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product';
import { CatalogMap } from './components/catalog-map/catalog-map';
import { CatalogAside } from './components/catalog-aside/catalog-aside';
import { CatalogGrid } from './components/catalog-grid/catalog-grid';

@Component({
  selector: 'app-catalog',
  imports: [CatalogMap, CatalogAside, CatalogGrid],
  templateUrl: './catalog.page.html',
  styleUrl: './catalog.page.scss',
})
export class Catalog {
  private productService = inject(ProductService);

  viewMode = signal<'grid' | 'map'>('grid');
  selectedCategory = signal<string>('Todos');
  proximity = signal<number>(15);

  allProducts = toSignal(this.productService.getProducts(), { initialValue: [] });

  /*products = computed(() =>
    this.allProducts().filter(p => p.status.name !== 'Entregado')
  );*/

    filteredProducts = computed(() => {
    return this.allProducts().filter(p => {
      const isAvailable = p.status.name !== 'Entregado';
      const matchesCat = this.selectedCategory() === 'Todos' || p.category.name === this.selectedCategory();
      return isAvailable && matchesCat;
    });
  });

  // Handlers para los eventos del Aside
  handleCategoryChange(cat: string) {
    this.selectedCategory.set(cat);
  }

  handleProximityChange(radius: number) {
    this.proximity.set(radius);
  }


}
