import { CarServiceDto } from './../../../../api/models/car-service-dto';
import { WorkerDto } from './../../../../api/models/worker-dto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { LoadServicePageAction, SaveServicePartAction } from '../state/service-part.state';
import { AutocompleteNamePartAction } from '../state/part.state';
import { Observable } from 'rxjs';
import { AutocompleteNameServiceCarAction } from '../state/service-car.state';
import { AutocompleteNameWorkerAction } from '../state/worker.state';
import { AutoCompleteNameVehicleAction, VehicleStateModel } from '../vehicle.state';
import { PartDto } from 'src/api/models';

@Component({
  selector: 'app-service-part',
  templateUrl: './service-part.component.html',
  styleUrls: ['./service-part.component.scss']
})
export class ServicePartComponent implements OnInit {
  formGroup: FormGroup;
  workerId: number;
  partId: number;
  serviceId: number;
  vehicleNumberPlate: string;
  @Select(state => state.part.partsAutocomplete)
  partAutocomplete$: Observable<PartDto[]>

  @Select(state => state.serviceCar.serviceCarAutocomplete)
  carServiceAutocomplete$: Observable<CarServiceDto[]>

  @Select(state => state.worker.autocompleteWorker)
  workerAutocomplete$: Observable<WorkerDto[]>

  @Select(state => state.vehicle.autocompleteVehicle)
  vehicleAutocomplete$: Observable<VehicleStateModel[]>

  constructor(public store: Store, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      partName: [''],
      serviceName: [''],
      vehicleNamberPlate: [''],
      workerId: ['']
    })
    this.carServiceAutocomplete$.subscribe(element => console.log(element))
  }

  searchPart(text) {
    this.store.dispatch(new AutocompleteNamePartAction(text))
  }

  searchServiceCar(text) {
    this.store.dispatch(new AutocompleteNameServiceCarAction(text))
  }

  searchWorker(text) {
    this.store.dispatch(new AutocompleteNameWorkerAction(text))
  }
  searchVehicle(text) {
    this.store.dispatch(new AutoCompleteNameVehicleAction(text))
  }
  selectWorker(id) {
    console.log('worker ' + id)
    this.workerId = id;
  }
  selectPart(id) {
    console.log('part ' + id)
    this.partId = id;
  }
  selectService(id) {
    console.log('service ' + id)
    this.serviceId = id;
  }

  selectVehicle(plateNumber) {
    console.log('vehicle ' + plateNumber)
    this.vehicleNumberPlate = plateNumber;
  }
  save() {
    this.store.dispatch(new SaveServicePartAction(this.workerId, this.serviceId, this.partId, this.vehicleNumberPlate))
  }
  traySelect(event) {
    console.log(event)
  }
}
