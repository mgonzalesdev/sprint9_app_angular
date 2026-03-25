import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/services/product.service';
import { GeocodingService } from '@core/services/geocoding';
import { Map } from '@shared/components/map/map';
import { of, switchMap } from 'rxjs';
import { UserCard } from '@shared/components/user-card/user-card';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Map, UserCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  id = input.required<string>();
  private productService = inject(ProductService);
  private geocodingService = inject(GeocodingService);


  product = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.productService.getProductById(Number(id)))
    )
  );

  private logDatos = effect(() => {
    console.log('Datos recibidos del backend:', this.product());
  });

  ubicacion = toSignal(
    toObservable(this.product).pipe(
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
