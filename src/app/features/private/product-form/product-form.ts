import { Component, inject, input, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CatalogService } from '@core/services/catalog';
import { ProductService } from '@core/services/product';
import { Map } from '@shared/components/map/map';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, Map,RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  id = input<string>(); // Viene de la URL si es edit
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private catalogService = inject(CatalogService);
  private router = inject(Router);

  categories = toSignal(this.catalogService.getCategories(), { initialValue: [] });
  conditions = toSignal(this.catalogService.getConditions(), { initialValue: [] });
  statuses = toSignal(this.catalogService.getStatuses(), { initialValue: [] });
  coords = signal({ lat: 41.38879, lng: 2.15899 });//Barcelona por defecto

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: [null, [Validators.required]],
    statusId: [null, [Validators.required]],
    conditionId: [null, [Validators.required]],
    userId: [1],// Id de Usuario
    latitude: [0],
    longitude: [0]
  });

  ngOnInit() {
    if (this.id()) {
      this.productService.getProductById(this.id()!).subscribe((prod: any) => {
        // console.log(prod);

        const formData = {
          ...prod,
          categoryId: prod.category?.id || prod.categoryId,
          statusId: prod.status?.id || prod.statusId,
          conditionId: prod.condition?.id || prod.conditionId,
          userId: prod.user?.id || prod.userId
        };

        this.productForm.patchValue(formData);

        if (prod.latitude && prod.longitude) {
          this.coords.set({
            lat: Number(prod.latitude),
            lng: Number(prod.longitude)
          });
        }
      });
    } else {// Crear nuevo producto
      this.getUserLocation();
    }
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Actualizamos el signal con la posición real inicial
        this.coords.set({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        // Sincronizamos con el formulario
        this.productForm.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
        (error) => console.warn('Geolocalización rechazada o no disponible:', error)
      );
    }
  }

  onMapChange(newCoords: { lat: number, lng: number }) {
    // Cuando el usuario arrastra el marcador, actualizamos el formulario
    this.productForm.patchValue({
      latitude: newCoords.lat,
      longitude: newCoords.lng
    });
  }

  save() {
    /* const data = this.productForm.value;
     const request = this.id()
       ? this.productService.update(this.id()!, data) // Debes crear update() en tu service de Angular
       : this.productService.create(data);            // Debes crear create() en tu service de Angular
 
     request.subscribe(() => this.router.navigate(['/catalog']));*/
    if (this.productForm.invalid) return;
    const data = this.productForm.value;
    console.log('📦 Enviando a la API:', data);
    const request = this.id()
      ? this.productService.update(this.id()!, data)
      : this.productService.create(data);

    request.subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: (err) => console.error('❌ Error API:', err)
    });
  }
}
