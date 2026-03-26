import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product.service';
import { CatalogMap } from './components/catalog-map/catalog-map';
import { CatalogAside } from './components/catalog-aside/catalog-aside';
import { CatalogGrid } from './components/catalog-grid/catalog-grid';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  imports: [CatalogMap, CatalogAside, CatalogGrid],
  templateUrl: './catalog.page.html',
  styleUrl: './catalog.page.scss',
})
export class Catalog {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);

  public queryParams = toSignal(this.route.queryParams as Observable<Params>, {
    initialValue: {} as Params
  });

  viewMode = signal<'grid' | 'map'>('grid');
  selectedCategory = signal<string>('Todos');
  proximity = signal<number>(15);

  allProducts = toSignal(this.productService.getProducts(), { initialValue: [] });

  filteredProducts = computed(() => {
    const params = this.queryParams();
    const searchTerm = (params['search'] || '').toString().toLowerCase();
    const catFilter = params['category'] || 'Todos';

    return this.allProducts().filter(p => {
      const isAvailable = p.status?.name !== 'Entregado';

      let matchesCat = false;
      if (catFilter === 'Todos') {
        matchesCat = true;
      } else {
        matchesCat = p.category?.name === catFilter;
      }
      const matchesSearch = !searchTerm ||
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm);

      return isAvailable && matchesCat && matchesSearch;
    });
  });


  handleCategoryChange(cat: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: cat === 'Todos' ? null : cat }, // limpia el param
      queryParamsHandling: 'merge' // Mantiene el ?search= si existe
    });
  }

  handleProximityChange(radius: number) {
    this.proximity.set(radius);
  }
}
