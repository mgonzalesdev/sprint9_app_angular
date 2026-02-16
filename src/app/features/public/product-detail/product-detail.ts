import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product.service';
import { Map } from '@shared/components/map/map';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Map],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
 // Angular 20 obtiene el ID directamente de la URL si configuras withComponentInputBinding()
  id = input.required<string>(); 
  private productService = inject(ProductService);

  // Cargamos el producto basado en el ID del input
  // (Asumiendo que tienes un método getById en tu servicio)
 // product = toSignal(this.productService.getProductById(this.id()));
   product = toSignal(
    toObservable(this.id).pipe(
      // Convertimos el string a number aquí para que coincida con tu API
      switchMap(id => this.productService.getProductById(Number(id)))
    )
  );
}
