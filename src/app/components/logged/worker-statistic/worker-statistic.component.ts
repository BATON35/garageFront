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
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }

  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          //   id: 'y-axis-0',
          //   position: 'left',
          // },
          // {
          //   id: 'y-axis-1',
          //   position: 'right',
          //   gridLines: {
          //     color: 'rgba(255,0,0,0.3)',
          //   },
          //   ticks: {
          //     fontColor: 'red',
          //   }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          // type: 'line',
          // mode: 'vertical',
          // scaleID: 'x-axis-0',
          // value: 'March',
          // borderColor: 'orange',
          // borderWidth: 2,
          // label: {
          //   enabled: true,
          //   fontColor: 'orange',
          //   content: 'LineAnno'
          // }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // red
    //   backgroundColor: 'rgba(255,0,0,0.3)',
    //   borderColor: 'red',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
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
        console.log('worker-statistic.component');
        console.log(this.lineChartData);
        console.log(statistics)
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
    console.log(new Date(this.workerStatisticForm.value.start).toLocaleString().split(',')[0].split('.').join('-'));
    console.log(new Date(this.workerStatisticForm.value.end).toLocaleString().split(',')[0].split('.').join('-'));
    // const start = new Date(this.workerStatisticForm.value.start).toLocaleString().split(',')[0].split('.')
    // const end = new Date(this.workerStatisticForm.value.end).toLocaleString().split(',')[0].split('.')
    // this.store.dispatch(new WorkerStatisticAction(
    //   start[2] + '-' + start[1] + '-' + start[0],
    //   end[2] + '-' + end[1] + '-' + end[0]))
    this.store.dispatch(new WorkerStatisticAction(this.workerStatisticForm.value.start, this.workerStatisticForm.value.end));
  }

}
