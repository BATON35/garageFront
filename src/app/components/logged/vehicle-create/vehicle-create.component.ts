import { element } from 'protractor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VehicleDto } from './../../../../api/models/vehicle-dto';
import { VehicleUpdateAction, VehicleCreateAction, VehicleDeleteAction, ClearVehicleAction } from './../vehicle.state';
import { Store, Select } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserCreateComponent } from '../user-create/user-create.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent implements OnInit {
  file: File[] = [];
  vehicleForm = new FormGroup({});
  vehicleFields: FormlyFieldConfig[] = [
    {
      key: 'brand',
      type: 'input',
      templateOptions: {
        label: 'marka pojazdu',
        Placeholder: 'marka pojazdu',
        require: true
      }
    },
    {
      key: 'model',
      type: 'input',
      templateOptions: {
        label: 'model',
        Placeholder: 'model',
        require: true
      }
    },
    {
      key: 'numberPlate',
      type: 'input',
      templateOptions: {
        label: 'numer rejestracyjny',
        Placeholder: 'numer rejestracyjny',
        require: true
      }
    }
  ];
  @Select(state => state.vehicle.errorMessage)
  errorMessage$: Observable<string>;
  @Select(state => state.vehicle.ok)
  ok$: Observable<boolean>;

  constructor(public store: Store,
    public matDialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicle: any) { }

  ngOnInit() {
    this.ok$.subscribe(element => {
      console.log('vehicle-create.component');
      console.log(element);
      if (element === true) {
        console.log(' in if !!!!!!!!!!!!!');
        this.store.dispatch(new ClearVehicleAction());
        this.matDialogRef.close();
      }
    });
  }
  submit() {
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
      );
    } else {
      this.store.dispatch(
        new VehicleCreateAction(
          {
            brand: this.vehicleForm.value.brand,
            model: this.vehicleForm.value.model,
            numberPlate: this.vehicleForm.value.numberPlate
          }, this.vehicle.client
        )
      );
    }
  }
  deleteVehicle(id) {
    this.store.dispatch(new VehicleDeleteAction(id));
  }
  saveFile(file: FileList) {
    Array.from(file).forEach(element => {
      this.file.push(element);
    });
  }
}
