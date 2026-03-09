import { Component, computed, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/catalog.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-catalog-map',
  imports: [],
  templateUrl: './catalog-map.html',
  styleUrl: './catalog-map.scss',
})
export class CatalogMap {
   products = input.required<Product[]>();
   selectedCategory = signal<string>('all');
 
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
             icon: this.getIconByCategory(product.category.name)
           }).bindPopup(`
             <strong>${product.name}</strong><br>
             ${product.description.substring(0, 50)}...<br>
             <small>Estado: ${product.status.name}</small>
             <button onclick="window.location.href='/product/${product.id}'" 
                      class="mt-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">Ver detalle</button>
           `);
 
           this.markerGroup.addLayer(marker);
         }
       });
 
       if (this.markerGroup.getLayers().length > 0) {
         this.map.fitBounds(this.markerGroup.getBounds(), { padding: [30, 30] });
       }
     });
   }
 
   private getIconByCategory(categoryName: string): L.DivIcon {
     // Definir un color o emoji por categoría
     const config: Record<string, string> = {
       'Hogar': '🏠',
       'Jardin': '🌳',
       'Electrónica': '🔌',
       'Muebles': '🪑',
       'Ropa': '👕',
       'Libros': '📚'
     };
 
     return L.divIcon({
       html: `<div style="font-size: 24px; filter: drop-shadow(0 0 2px black);">
               ${config[categoryName] || '🎁'}
              </div>`,
       className: 'custom-product-icon',
       iconSize: [30, 30],
       iconAnchor: [15, 15]
     });
   }
}
