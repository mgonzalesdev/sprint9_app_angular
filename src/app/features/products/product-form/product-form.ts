import { Component, inject, input, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { AiService } from '@core/services/ai.service';
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
  private aiScanner = inject(AiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  categories = toSignal(this.catalogService.getCategories(), { initialValue: [] });
  conditions = toSignal(this.catalogService.getConditions(), { initialValue: [] });
  statuses = toSignal(this.catalogService.getStatuses(), { initialValue: [] });
  coords = signal({ lat: 41.38879, lng: 2.15899 });//Barcelona por defecto

  selectedFile = signal<File | null>(null);
  preview = signal<string | null>(null);
  isAiLoading = signal(false);
  ecoImpactInfo = signal<string | null>(null);

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: [null, [Validators.required]],
    statusId: [null, [Validators.required]],
    conditionId: [null, [Validators.required]],
    userId: [null as number | null],
    latitude: [0],
    longitude: [0]
  });

  ngOnInit() {
    if (this.id()) {
      this.productService.getProductById(this.id()!).subscribe((prod: any) => {
        const currentUser = this.authService.currentUser();
        if (prod.user.id !== currentUser?.id) {
          alert('No tienes permiso para editar este objeto 🚫');
          this.router.navigate(['/manage/list']);
          return;
        }
        if (prod.image) {
          this.preview.set(prod.image);
        }
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

  save() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // muestra los errores en el HTML
      return;
    }
    const data = this.productForm.getRawValue();
    const image = this.selectedFile(); //  Signal donde se guardo el archivo del <input type="file">
    
    const request = this.id()
      ? this.productService.update(this.id()!, data)
      : this.productService.create(data, image);

    request.subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: (err) => console.error(' Error API:', err)
    });
  }

  analyzeWithAi() {
    const file = this.selectedFile();
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Esta foto es muy grande. Intenta con una más pequeña. 📸');
      return;
    }
    this.isAiLoading.set(true);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      this.aiScanner.analyzeImage(base64).subscribe({
        next: (res) => {
          const foundCategory = this.categories().find(
            (c: any) => c.name.toLowerCase() === res.category.toLowerCase()
          );

          this.productForm.patchValue({
            name: res.name,
            description: res.description,
            categoryId: foundCategory ? foundCategory.id : this.productForm.value.categoryId
          });
          this.ecoImpactInfo.set(res.ecoImpact);
          this.isAiLoading.set(false);
        },
        error: (err) => {
          console.error('Error IA:', err);
          this.isAiLoading.set(false);
        }
      });
    };
    reader.readAsDataURL(file);
  }
  clearAiData() {
    this.ecoImpactInfo.set(null);
    this.productForm.patchValue({ name: '', description: '' });
  }

}
