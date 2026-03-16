import { Component, computed, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/catalog.model';
import { CategoryIconPipe } from '@shared/pipes/category-icon-pipe';
import * as L from 'leaflet';

@Component({
  selector: 'app-catalog-map',
  imports: [CategoryIconPipe],
  templateUrl: './catalog-map.html',
  styleUrl: './catalog-map.scss',
})
export class CatalogMap {
  products = input.required<Product[]>();
  selectedCategory = signal<string>('all');
private categoryIconPipe = inject(CategoryIconPipe);
  // Extrae categorías únicas de los productos para el filtro
  categories = computed(() =>
    [...new Set(this.products().map(p => p.category.name))]
  );

  // Filtra productos basándose en la señal del select
  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    return category === 'all'
      ? this.products()
      : this.products().filter(p => p.category.name === category);
  });

  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map?: L.Map;
  private markerGroup = L.featureGroup();

  constructor() {
    effect((onCleanup) => {
      const container = this.mapContainer().nativeElement;
      this.map = L.map(container).setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.markerGroup.addTo(this.map);
      onCleanup(() => this.map?.remove());
    });

    effect(() => {
      const currentProducts = this.filteredProducts();
      if (!this.map) return;

      this.markerGroup.clearLayers();

      currentProducts.forEach(product => {
        // Convertimos string a number para Leaflet
        const lat = parseFloat(product.latitude);
        const lng = parseFloat(product.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng], {
            icon: this.createCustomIcon(product.category.name)
          }).bindPopup(`
            <div class="mb-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-64 overflow-hidden border border-primary/10">
<div class="h-32 bg-cover bg-center relative" data-alt="Sofá de cuero vintage en buen estado" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuYClYhj0ZTYa6lE_An_Icz7A4XMKVNEwIYNwAuOFqlPbLlyNowqzPXuiyxhE5W7M5-DmkUAPTx3o4X1olb82tvHQC0NmS3hAtYkY6HFwaY8knVT8e9kUcSwPVcMU4jn46dirBcJGIhWytOO5FgcyQ5U3uEMD-R1DmGJuUG5w5k5HNYfkee26o5K08w_ubQpgSZ94TTcOhUk5ieHE0fAoDsdNMqCBQugUhpy-UGG29TTBKrS9AwHjeBUWQHd_KuRymGAUHMMXHECk');">
<span class="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase">Disponible</span>
</div>
<div class="p-4">
<h4 class="font-bold text-slate-900 dark:text-white truncate"> ${product.name}</h4>
             ${product.description.substring(0, 50)}...<br>
<div class="flex items-center gap-2 mt-1 text-slate-500 dark:text-slate-400">
<span class="material-symbols-outlined text-sm">location_on</span>
<span class="text-xs">A 1.2 km de ti</span>
</div>
<button onclick="window.location.href='/product/${product.id}'"  class="mt-3 w-full py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all">Ver detalles</button>
</div>
</div>

           `);

          this.markerGroup.addLayer(marker);
        }
      });

      if (this.markerGroup.getLayers().length > 0) {
        this.map.fitBounds(this.markerGroup.getBounds(), { padding: [30, 30] });
      }
    });
  }

  private createCustomIcon(categoryName: string): L.DivIcon {
    // Definir un color o emoji por categoría
    const config: Record<string, string> = {
      'Hogar': '🏠',
      'Jardin': '🌳',
      'Electrónica': '🔌',
      'Muebles': '🪑',
      'Ropa': '👕',
      'Libros': '📚'
    };
 const iconName = this.categoryIconPipe.transform(categoryName);
    return L.divIcon({
      html: `<div class="absolute bottom-1/4 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
<div class="relative flex flex-col items-center">
<div class="bg-primary/80 text-white p-2 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-xl">${iconName}</span>
</div>
<div class="w-1 h-3 bg-primary/80 -mt-1 shadow-sm"></div>
</div>
</div>
`,
      className: 'custom-product-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
  }
}
