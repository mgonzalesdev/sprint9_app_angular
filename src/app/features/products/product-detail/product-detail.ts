import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product.service';
import { GeocodingService } from '@core/services/geocoding';
import { Map } from '@shared/components/map/map';
import { of, switchMap } from 'rxjs';

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
  private geocodingService = inject(GeocodingService);

  // Cargamos el producto basado en el ID del input
  // (Asumiendo que tienes un método getById en tu servicio)
  // product = toSignal(this.productService.getProductById(this.id()));
  product = toSignal(
    toObservable(this.id).pipe(
      // Convertimos el string a number aquí para que coincida con tu API
      switchMap(id => this.productService.getProductById(Number(id)))
    )
  );

  private logDatos = effect(() => {
    console.log('Datos recibidos del backend:', this.product());
  });

  ubicacion = toSignal(
    toObservable(this.product).pipe(
      // Solo disparamos la búsqueda si el producto existe y tiene coordenadas
      switchMap(p => {
        if (p && p.latitude && p.longitude) {
          return this.geocodingService.getCityCountry(Number(p.latitude), Number(p.longitude));
        }
        return of('Sin coordenadas');
      })
    ),
    { initialValue: 'Cargando ubicación...' }
  );


}
