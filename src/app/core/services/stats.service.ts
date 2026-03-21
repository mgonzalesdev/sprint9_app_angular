import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryStat, SummaryStats, TrendStat } from '@core/models/catalog.model';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/stats';

  getSummary() {
    return this.http.get<SummaryStats>(`${this.apiUrl}/summary`);
  }

  getPieChartData() {
    return this.http.get<CategoryStat>(`${this.apiUrl}/pie-category`);
  }
  getBarChartData() {
    return this.http.get<TrendStat>(`${this.apiUrl}/bar-trends`);
  }
}

