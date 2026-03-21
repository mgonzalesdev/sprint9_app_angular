import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@core/models/catalog.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/products'; // Tu API NestJS

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /*create(product: any) {
    return this.http.post(this.apiUrl, product);
  }*/
  create(product: any, imageFile: File | null) {
    const formData = new FormData();
    Object.keys(product).forEach(key => {
      // Convertimos a string porque FormData solo acepta strings o Blobs
      formData.append(key, String(product[key]));
    });

    // 2. Agregamos el archivo de imagen si existe
    if (imageFile) {
      formData.append('image', imageFile); // 'image' debe coincidir con el Interceptor de NestJS
    }
    console.log('Contenido del FormData:');
    formData.forEach((value, key) => {
      console.log(key + ': ', value); // Aquí verás si 'image' es un objeto File
    });
    return this.http.post(this.apiUrl, formData);
  }

  update(id: string | number, product: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}