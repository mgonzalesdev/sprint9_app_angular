import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalogService } from '@core/services/catalog';
import { ProductService } from '@core/services/product';

@Component({
  selector: 'app-catalog-aside',
  imports: [],
  templateUrl: './catalog-aside.html',
  styleUrl: './catalog-aside.scss',
})
export class CatalogAside {
  private catalogService = inject(CatalogService);

  //categories = ['Todos', 'Ropa', 'Hogar', 'Juguetes', 'Tecnología'];
  categories = toSignal(this.catalogService.getCategories(), { initialValue: [] });
}
