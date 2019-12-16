import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PartDto, CarServiceDto, WorkerDto } from 'src/api/models';
import { VehicleStateModel, AutoCompleteNameVehicleAction } from '../vehicle.state';
import { AutocompleteNamePartAction } from '../state/part.state';
import { AutocompleteNameServiceCarAction } from '../state/service-car.state';
import { AutocompleteNameWorkerAction } from '../state/worker.state';
import { SaveJobAction } from '../state/job.state';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
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
    this.store.dispatch(new SaveJobAction(this.workerId, this.partId, this.serviceId, this.vehicleNumberPlate))
  }
  traySelect(event) {
    console.log(event)
  }

}
