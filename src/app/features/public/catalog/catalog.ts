import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product.service';
import { ProductCard } from '@shared/components/product-card/product-card';

@Component({
  selector: 'app-catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private productService = inject(ProductService);
  // Convertimos el observable a Signal directamente
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
}
