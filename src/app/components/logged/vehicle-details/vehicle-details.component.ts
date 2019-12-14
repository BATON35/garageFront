import { VehicleUpdateAction } from './../vehicle.state';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
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
  vehicleDetailForm = new FormGroup({});
  vehicleDetailFields: FormlyFieldConfig[] = [
    {
      key: 'brand',
      type: 'input',
      templateOptions: {
        label: 'marka pojazdu',
        Placeholder: 'marka pojazdu',
        require: true,
        disabled: true
      }
    },
    {
      key: 'model',
      type: 'input',
      templateOptions: {
        label: 'model',
        Placeholder: 'model',
        require: true,
        disabled: true
      }
    },
    {
      key: 'numberPlate',
      type: 'input',
      templateOptions: {
        label: 'numer rejestracyjny',
        Placeholder: 'numer rejestracyjny',
        require: true,
        disabled: true
      }
    },
    {
      key: 'overviewDate',
      type: 'datepicker',
      templateOptions: {
        label: 'data przegladu',
        Placeholder: 'podaj date',
        require: true,
        disabled: true
      }
    }
  ]

  constructor(public store: Store,
    public matDialogRef: MatDialogRef<VehicleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicle: any) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.vehicle)

    this.store.dispatch(
      new VehicleUpdateAction(
        {
          id: this.vehicle.vehicleDto.id,
          brand: this.vehicleDetailForm.value.brand,
          model: this.vehicleDetailForm.value.model,
          numberPlate: this.vehicleDetailForm.value.numberPlate,
          overviewDate: this.vehicleDetailForm.value.overviewDate
        }
      )
    )

    this.matDialogRef.close()
  }
}
