import { element } from 'protractor';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { VehicleDto } from './../../../../api/models/vehicle-dto';
import { VehicleUpdateAction, VehicleCreateAction, VehicleDeleteAction, ClearVehicleAction } from './../vehicle.state';
import { Store, Select } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserCreateComponent } from '../user-create/user-create.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent implements OnInit, OnDestroy {
  vehicleTemp: VehicleDto = {};
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
    @Inject(MAT_DIALOG_DATA) public vehicle: any,
    public matSnackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.vehicle)
    if (this.vehicle != null) {
      this.vehicleTemp.brand = this.vehicle.vehicleDto.brand;
      this.vehicleTemp.model = this.vehicle.vehicleDto.model;
      this.vehicleTemp.numberPlate = this.vehicle.vehicleDto.numberPlate;
    }
    this.ok$.subscribe(element => {
      if (element === true) {
        this.store.dispatch(new ClearVehicleAction());
        this.vehicle.vehicleDto.brand = this.vehicleTemp.brand;
        this.vehicle.vehicleDto.model = this.vehicleTemp.model;
        this.vehicle.vehicleDto.numberPlate = this.vehicleTemp.numberPlate;
        this.matSnackBar.open('zapisano', 'zamknij', { duration: 2000 });
        this.matDialogRef.close();
      }
    });
  }
  ngOnDestroy() {
    this.store.dispatch(new ClearVehicleAction());
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
