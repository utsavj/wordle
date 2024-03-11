import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MONTHS } from '../EnumConstants';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.scss']
})
export class PerformanceChartComponent {
  public chart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: 'Attempts to Guess',
            data: [6, 5, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
