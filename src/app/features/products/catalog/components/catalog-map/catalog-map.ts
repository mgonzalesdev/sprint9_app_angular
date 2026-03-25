import { Component, computed, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { Product } from '@core/models/catalog.model';
import { CategoryIconPipe } from '@shared/pipes/category-icon-pipe';
import * as L from 'leaflet';

@Component({
  selector: 'app-catalog-map',
  imports: [],
  templateUrl: './catalog-map.html',
  styleUrl: './catalog-map.scss',
})
export class CatalogMap {
  products = input.required<Product[]>();

  private categoryIconPipe = inject(CategoryIconPipe);

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
      if (!this.map) return;

      this.markerGroup.clearLayers();

      this.products().forEach(product => {
        const lat = parseFloat(product.latitude);
        const lng = parseFloat(product.longitude);
        const img = product.image ? product.image : '/placeholder.jpg';
        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng], {
            icon: this.createCustomIcon(product.category.name)
          }).bindPopup(`
            <div class="mb-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-64 overflow-hidden border border-primary/10">
              <div class="h-32 bg-cover bg-center relative"  style="background-image: url('${img}');">
              <span class="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase">Disponible</span>
              </div>
              <div class="p-4">
              <h4 class="font-bold text-slate-900 dark:text-white truncate"> ${product.name}</h4>
                          ${product.description.substring(0, 50)}...<br>
              <button onclick="window.location.href='/product/${product.id}'"  class="mt-3 w-full py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all">Ver detalles</button>
              </div></div>`);

          this.markerGroup.addLayer(marker);
        }
      });
      if (this.markerGroup.getLayers().length > 0) {
        this.map.fitBounds(this.markerGroup.getBounds(), { padding: [30, 30] });
      }
    });
  }

  private createCustomIcon(categoryName: string): L.DivIcon {
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
