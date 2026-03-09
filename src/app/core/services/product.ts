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
  create(product: any) {
    return this.http.post(this.apiUrl, product);
  }

  update(id: string | number, product: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}