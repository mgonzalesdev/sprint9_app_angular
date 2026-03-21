import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';
  getCategories() { return this.http.get<any[]>(`${this.baseUrl}/products/categories`); }
  getConditions() { return this.http.get<any[]>(`${this.baseUrl}/products/conditions`); }
  getStatuses() { return this.http.get<any[]>(`${this.baseUrl}/products/statuses`); }
}
