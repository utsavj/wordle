import { Component, Inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MONTHS } from '../EnumConstants';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.scss']
})
export class PerformanceChartComponent {
  public chart: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
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
            data: this.data.res,
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
