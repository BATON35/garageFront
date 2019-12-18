import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { LoadHistoryAction } from '../state/job.state';
import { Observable } from 'rxjs';
import { JobResponseDto } from 'src/api/models';

@Component({
  selector: 'app-vehicle-history',
  templateUrl: './vehicle-history.component.html',
  styleUrls: ['./vehicle-history.component.scss']
})
export class VehicleHistoryComponent implements OnInit {
  @Select(state => state.job.jobHistory)
  jobHistory$: Observable<JobResponseDto[]>;
  displayedColumns: string[] = ["Part", "CarService", "Date"]
  constructor(public store: Store,
    public matDialogRef: MatDialogRef<VehicleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicle: any) { }


  ngOnInit() {
    this.store.dispatch(new LoadHistoryAction(this.vehicle.id));
  }

}
