import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@core/models/catalog.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/products'; 

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductByUser() {
    return this.http.get<Product[]>(`${this.apiUrl}/user/my-products`);
  }
  getProductById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: any, imageFile: File | null) {
    const formData = new FormData();
    Object.keys(product).forEach(key => {
      formData.append(key, String(product[key]));
    });

    if (imageFile) {
      formData.append('image', imageFile); 
    }
    console.log('Contenido del FormData:');
    formData.forEach((value, key) => {
      console.log(key + ': ', value); 
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