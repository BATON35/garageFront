import {TranslateService} from '@ngx-translate/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {VehicleDto} from './../../../../api/models/vehicle-dto';
import {
  VehicleUpdateAction,
  VehicleCreateAction,
  VehicleDeleteAction,
  ClearVehicleAction
} from './../vehicle.state';
import {Store, Select} from '@ngxs/store';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserCreateComponent} from '../user-create/user-create.component';
import {Observable} from 'rxjs';
import {GetBrandAction, GetModelAction, GetProductionDateAction} from '../state/car.state';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent implements OnInit, OnDestroy {
  message: string = this.translateService.instant('vehicle.ubdate.matSnackBar.message');
  config: string = this.translateService.instant('vehicle.ubdate.matSnackBar.config');
  vehicleTemp: VehicleDto = {};
  file: File[] = [];
  vehicleForm = new FormGroup({});

  @Select(state => state.vehicle.errorMessage)
  errorMessage$: Observable<string>;
  @Select(state => state.vehicle.ok)
  ok$: Observable<boolean>;
  @Select(state => state.car.brands)
  brands$: Observable<string[]>;
  @Select(state => state.car.models)
  models$: Observable<string[]>;
  @Select(state => state.car.productionDate)
  productionDate$: Observable<string[]>;

  constructor(
    public store: Store,
    public matDialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicle: any,
    public matSnackBar: MatSnackBar,
    public translateService: TranslateService,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.vehicle.vehicleDto) {
      this.vehicleTemp.brand = this.vehicle.vehicleDto.brand;
      this.vehicleTemp.model = this.vehicle.vehicleDto.model;
      this.vehicleTemp.numberPlate = this.vehicle.vehicleDto.numberPlate;
    }
    this.ok$.subscribe(ok => {
      if (ok === true) {
        this.store.dispatch(new ClearVehicleAction());
        if (this.vehicle.vehicleDto) {
          this.vehicle.vehicleDto.brand = this.vehicleTemp.brand;
          this.vehicle.vehicleDto.model = this.vehicleTemp.model;
          this.vehicle.vehicleDto.numberPlate = this.vehicleTemp.numberPlate;
        }
        this.matSnackBar.open(this.message, this.config, {duration: 2000});
        this.matDialogRef.close();
      }
    });
    this.store.dispatch(new GetBrandAction ());
    this.vehicleForm = this.formBuilder.group({
      brand: [null, Validators.required],
      model: [null, Validators.required],
      numberPlate: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearVehicleAction());
  }

  submit() {
    if (this.vehicle.vehicleDto) {
      const vehicleForm: VehicleDto = {
        id: this.vehicle.vehicleDto.id,
        brand: this.vehicleForm.value.brand,
        model: this.vehicleForm.value.model,
        productionDate: this.vehicleForm.value.date,
        numberPlate: this.vehicleForm.value.numberPlate
      };
      if (vehicleForm !== this.vehicle.vehicleDto) {
        this.store.dispatch(
          new VehicleUpdateAction(
            {
              id: this.vehicle.vehicleDto.id,
              brand: this.vehicleForm.value.brand,
              model: this.vehicleForm.value.model,
              productionDate: this.vehicleForm.value.date,
              numberPlate: this.vehicleForm.value.numberPlate
            }, this.file
          )
        );
      }
    } else {
      this.store.dispatch(
        new VehicleCreateAction(
          {
            brand: this.vehicleForm.value.brand,
            model: this.vehicleForm.value.model,
            productionDate: this.vehicleForm.value.date,
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

  selectBrand(brand: string) {
    this.store.dispatch(new GetModelAction(brand));
  }

  selectDate(model: string) {
    this.store.dispatch(new GetProductionDateAction(this.vehicleForm.value.brand, model));
  }
}
