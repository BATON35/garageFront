import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VehicleDto } from './../../../../api/models/vehicle-dto';
import { VehicleUpdateAction, VehicleCreateAction, VehicleDeleteAction } from './../vehicle.state';
import { Store } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent implements OnInit {
  file: File = null;
  vehicleForm = new FormGroup({});
  vehicleFields: FormlyFieldConfig[] = [
    {
      key: "brand",
      type: "input",
      templateOptions: {
        label: "marka pojazdu",
        Placeholder: "marka pojazdu",
        require: true
      }
    },
    {
      key: "model",
      type: "input",
      templateOptions: {
        label: "model",
        Placeholder: "model",
        require: true
      }
    },
    {
      key: "numberPlate",
      type: "input",
      templateOptions: {
        label: "numer rejestracyjny",
        Placeholder: "numer rejestracyjny",
        require: true
      }
    }
  ]
  constructor(public store: Store,
    public matDialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicle: any) { }

  ngOnInit() {
  }
  submit() {
    console.log('vehicle.component')
    console.log(this.file)
    if (this.vehicle.vehicleDto) {
      this.store.dispatch(
        new VehicleUpdateAction(
          {
            id: this.vehicle.vehicleDto.id,
            brand: this.vehicleForm.value.brand,
            model: this.vehicleForm.value.model,
            numberPlate: this.vehicleForm.value.numberPlate
          }, this.file
        )
      )
    } else {
      this.store.dispatch(
        new VehicleCreateAction(
          {
            brand: this.vehicleForm.value.brand,
            model: this.vehicleForm.value.model,
            numberPlate: this.vehicleForm.value.numberPlate
          }, this.vehicle.client
        )
      )
    }
    this.matDialogRef.close()
  }
  deleteVehicle(id) {
    this.store.dispatch(new VehicleDeleteAction(id))
  }
  saveFile(file: FileList) {
    this.file = file[0]
  }
}
