import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatsService } from '@core/services/stats';
import { Chart } from '@shared/components/chart/chart';

@Component({
  selector: 'app-dashboard',
  imports: [Chart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private statsService = inject(StatsService);

  /*stats = toSignal(this.statsService.getSummary());
  statusData = computed(() => ({
    labels: this.stats()?.statusDist.map(s => s.label) || [],
    datasets: [{
      data: this.stats()?.statusDist.map(s => s.count) || [],
      backgroundColor: ['#4caf50', '#ff9800', '#9e9e9e']
    }]
  }));

  categoryData = computed(() => ({
    labels: this.stats()?.categoryDist.map(c => c.label) || [],
    datasets: [{
      label: 'Objetos Salvados ♻️',
      data: this.stats()?.categoryDist.map(c => c.count) || [],
      backgroundColor: '#2196f3'
    }]
  }));*/
  // 1. Signals de datos crudos (API)
  rawPie = toSignal(this.statsService.getPieChartData(), { initialValue: [] as any });
  rawBar = toSignal(this.statsService.getBarChartData(), { initialValue: [] as any });
  summary = toSignal(this.statsService.getSummary(), { initialValue: { totalProducts: 0, activeProducts: 0 } });


  categoryPieData = computed(() => {
    const data = this.rawPie();
    // Verificamos que sea un array antes de mapear
    const stats = Array.isArray(data) ? data : [];

    return {
      labels: stats.map(item => item.label),
      datasets: [{
        data: stats.map(item => Number(item.value)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }]
    };
  });

  trendsBarData = computed(() => {
    const data = this.rawBar();
    const stats = Array.isArray(data) ? data : [];

    return {
      labels: stats.map(item => item.month),
      datasets: [{
        label: 'Nuevos Regalos por Mes',
        data: stats.map(item => Number(item.total)),
        backgroundColor: '#42A5F5'
      }]
    };
  });

}
