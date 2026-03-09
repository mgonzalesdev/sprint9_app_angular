import { Component, effect, ElementRef, input, output, viewChild } from '@angular/core';
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
  isEditable = input<boolean>(false);
  locationChanged = output<{ lat: number, lng: number }>();

  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map!: L.Map;
  private marker!: L.Marker;

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

    this.marker = L.marker([lat, lng], {
      draggable: this.isEditable()
    }).addTo(this.map);

    if (this.isEditable()) {
      this.marker.on('dragend', () => {
        const position = this.marker.getLatLng();
        this.locationChanged.emit({ lat: position.lat, lng: position.lng });
      });
    }
  }
}
