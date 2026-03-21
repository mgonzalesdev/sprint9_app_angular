import { Component, inject, input, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { CatalogService } from '@core/services/catalog.service';
import { ProductService } from '@core/services/product.service';
import { Map } from '@shared/components/map/map';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, Map, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  id = input<string>(); // Viene de la URL si es edit
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private catalogService = inject(CatalogService);
  private router = inject(Router);
  private authService = inject(AuthService);

  categories = toSignal(this.catalogService.getCategories(), { initialValue: [] });
  conditions = toSignal(this.catalogService.getConditions(), { initialValue: [] });
  statuses = toSignal(this.catalogService.getStatuses(), { initialValue: [] });
  coords = signal({ lat: 41.38879, lng: 2.15899 });//Barcelona por defecto

  selectedFile = signal<File | null>(null);
  preview = signal<string | null>(null);

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: [null, [Validators.required]],
    statusId: [null, [Validators.required]],
    conditionId: [null, [Validators.required]],
    userId: [null as number | null],// Id de Usuario authService.currentUser()?.name
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

        if (prod.latitude && prod.longitude) {
          this.coords.set({
            lat: Number(prod.latitude),
            lng: Number(prod.longitude)
          });
        }
        const currentUser = this.authService.currentUser();
        if (prod.user.id !== currentUser?.id) {
          alert('No tienes permiso para editar este objeto 🚫');
          this.router.navigate(['/manage/list']);
          return;
        }
        this.productForm.patchValue(formData);
      });
    } else {// Crear nuevo producto
      const user = this.authService.currentUser();
      if (user) {
        this.productForm.patchValue({ userId: user.id });
      }
      this.getUserLocation();
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.selectedFile.set(file);
      this.preview.set(URL.createObjectURL(file)); // Preview instantánea
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

  /*save() {
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
  }*/
  save() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // 👈 Esto "ilumina" los errores en el HTML
      console.warn('⚠️ Formulario incompleto o inválido');
      return;
    }
    const data = this.productForm.getRawValue();
    const image = this.selectedFile(); // 👈 El Signal donde guardaste el archivo del <input type="file">

    console.log('📦 Enviando FormData con imagen:', data);

    const request = this.id()
      ? this.productService.update(this.id()!, data) // Para update podrías necesitar lógica similar
      : this.productService.create(data, image);   // 👈 Pasamos los datos y la imagen

    request.subscribe({
      next: () => {
        console.log('✅ Producto creado con éxito');
        this.router.navigate(['/catalog']);
      },
      error: (err) => console.error('❌ Error API:', err)
    });
  }
}
