import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) { }


  getCityCountry(lat: number, lon: number): Observable<string> {
    return this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
      .pipe(
        map(data => {
          // Prioridad de localidad: ciudad, pueblo o villa
          const city = data.address?.city || data.address?.town || data.address?.village || data.address.province || data.address.county || data.address.state_district || 'Desconocida';

          const country = data.address?.country || '';
          return `${city}, ${country}`;
        }),
        catchError(() => of('Ubicación no disponible'))
      );
  }
}
