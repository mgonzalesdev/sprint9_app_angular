import { Component, input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class Chart {
  type = input.required<ChartType>();
  data = input.required<ChartData<any>>();

  options = input<ChartConfiguration['options']>({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' }
    }
  })

}
