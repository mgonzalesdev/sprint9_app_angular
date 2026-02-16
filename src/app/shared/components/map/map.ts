import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {
 lat = input.required<number>();
  lng = input.required<number>();
  
  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map!: L.Map;

  constructor() {
    // Reacciona automáticamente cuando cambian las coordenadas
    effect(() => {
      this.initMap(this.lat(), this.lng());
    });
  }

  private initMap(lat: number, lng: number): void {
    if (this.map) this.map.remove();

    this.map = L.map(this.mapContainer().nativeElement).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map)
      .bindPopup('Punto de entrega 🎁')
      .openPopup();
  }
}
