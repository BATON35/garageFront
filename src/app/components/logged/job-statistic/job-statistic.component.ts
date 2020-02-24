import { element } from 'protractor';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartTooltipLabelColor } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Select, Store } from '@ngxs/store';
import { JobStatisticIncome } from 'src/api/models';
import { JobStatisticAction } from '../state/job.state';

@Component({
  selector: 'app-job-statistic',
  templateUrl: './job-statistic.component.html',
  styleUrls: ['./job-statistic.component.scss']
})
export class JobStatisticComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [] }
  ];

  @Select(state => state.job.statistic)
  jobs$: Observable<JobStatisticIncome[]>;
  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new JobStatisticAction());
    this.jobs$.subscribe(statistics => {
      if (statistics.length !== 0) {
        this.barChartLabels = Array.from(new Set(statistics.map(element => element.date)))
        this.barChartData = [];
        this.barChartData.push({
          data: statistics.map(statistic => statistic.price),
          label: 'Income'
        });
      }
    });
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
}
