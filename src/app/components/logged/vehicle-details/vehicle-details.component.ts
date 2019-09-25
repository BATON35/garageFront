import { VehicleDto } from './../../../../api/models/vehicle-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngxs/store';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  constructor(public store: Store,
    public matDialogRef: MatDialogRef<VehicleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicle: any) { }

  ngOnInit() {
    console.log(this.vehicle)
  }
}
