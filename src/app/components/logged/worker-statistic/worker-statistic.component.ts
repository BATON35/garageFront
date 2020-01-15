import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Store, Select } from '@ngxs/store';
import { WorkerStatisticAction } from '../state/worker-statistic.actions';
import { Observable } from 'rxjs';
import { WorkerStatisticSell } from 'src/api/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


@Component({
  selector: 'app-worker-statistic',
  templateUrl: './worker-statistic.component.html',
  styleUrls: ['./worker-statistic.component.scss']
})
export class WorkerStatisticComponent implements OnInit {
  workerStatisticForm = new FormGroup({});
  date: FormlyFieldConfig[] = [
    {
      key: 'start',
      type: 'datepicker',
      templateOptions: {
        label: 'start date',
        Placeholder: 'start date',
        require: true
      }
    },
    {
      key: 'end',
      type: 'datepicker',
      templateOptions: {
        label: 'end date',
        Placeholder: 'end date',
        require: true
      }
    }
  ];
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{}]
    },
    annotation: {
      annotations: [{}]
    },
  };
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  @Select(state => state.workerStatistic.statistic)
  workers$: Observable<WorkerStatisticSell[]>;
  constructor(public store: Store, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.store.dispatch(new WorkerStatisticAction('2019-01-01', '2019-12-29'));
    this.workers$.subscribe(statistics => {
      if (statistics.length !== 0) {
        this.lineChartLabels = Array.from(new Set(statistics.map(element => element.date)));
        const names = Array.from(new Set(statistics.map(statistic => statistic.name)));
        this.lineChartData = [];
        names.forEach(name => {
          this.lineChartData.push({
            data: statistics.filter(statistic => statistic.name === name).map(statistic => statistic.price),
            label: name
          });
        });
      }
    });
    this.workerStatisticForm = this.formBuilder.group({
      start: [
        null,
        Validators.required
      ],
      end: [
        null,
        Validators.required
      ]

    });
  }

  displayData() {
    this.store.dispatch(new WorkerStatisticAction(this.workerStatisticForm.value.start, this.workerStatisticForm.value.end));
  }

}
