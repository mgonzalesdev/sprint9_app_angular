import { Component, computed, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalogService } from '@core/services/catalog';
import { ProductService } from '@core/services/product';
import { CategoryIconPipe } from '@shared/pipes/category-icon-pipe';

@Component({
  selector: 'app-catalog-aside',
  imports: [CategoryIconPipe],
  templateUrl: './catalog-aside.html',
  styleUrl: './catalog-aside.scss',
})
export class CatalogAside {
  private catalogService = inject(CatalogService);

  currentCategory = input.required<string>();
  categoryChange = output<string>();
  proximityChange = output<number>();

  //categories = ['Todos', 'Ropa', 'Hogar', 'Juguetes', 'Tecnología'];
  categories_data = toSignal(this.catalogService.getCategories(), { initialValue: [] });
  categories = computed(() => ['Todos', ...this.categories_data().map(p => p.name)]);
  
}
