import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PartDto, CarServiceDto, WorkerDto } from 'src/api/models';
import { VehicleStateModel, AutoCompleteNameVehicleAction } from '../vehicle.state';
import { AutocompleteNamePartAction } from '../state/part.state';
import { AutocompleteNameServiceCarAction } from '../state/service-car.state';
import { AutocompleteNameWorkerAction } from '../state/worker.state';
import { SaveJobAction } from '../state/job.state';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  formGroup: FormGroup;
  workerId: number;
  partIds: number[];
  serviceId: number;
  vehicleNumberPlate: string;
  partCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  temp = [];
  removable = true;
  selectable = true;
  @Select(state => state.part.partsAutocomplete)
  partAutocomplete$: Observable<PartDto[]>;

  @Select(state => state.serviceCar.serviceCarAutocomplete)
  carServiceAutocomplete$: Observable<CarServiceDto[]>;

  @Select(state => state.worker.autocompleteWorker)
  workerAutocomplete$: Observable<WorkerDto[]>;

  @Select(state => state.vehicle.autocompleteVehicle)
  vehicleAutocomplete$: Observable<VehicleStateModel[]>;

  constructor(public store: Store, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      partsName: [''],
      serviceName: [''],
      vehicleNamberPlate: [''],
      workerId: ['']
    });
    this.carServiceAutocomplete$.subscribe(element => console.log(element));
  }

  searchPart(text) {
    this.store.dispatch(new AutocompleteNamePartAction(text));
  }

  searchServiceCar(text) {
    this.store.dispatch(new AutocompleteNameServiceCarAction(text));
  }

  searchWorker(text) {
    this.store.dispatch(new AutocompleteNameWorkerAction(text));
  }
  searchVehicle(text) {
    this.store.dispatch(new AutoCompleteNameVehicleAction(text));
  }
  selectWorker(id) {
    console.log('worker ' + id);
    this.workerId = id;
  }
  selectPart(id) {
    console.log('part ' + id);
    this.partIds = id;
  }
  selectService(id) {
    console.log('service ' + id);
    this.serviceId = id;
  }

  selectVehicle(plateNumber) {
    console.log('vehicle ' + plateNumber);
    this.vehicleNumberPlate = plateNumber;
  }
  save() {
    this.store.dispatch(new SaveJobAction(this.workerId, this.temp.map(e => e.id), this.serviceId, this.vehicleNumberPlate));
    console.log(this.partAutocomplete$)
    console.log(this.partIds)
  }
  traySelect(event) {
    this.temp.push(event.option.value)
    console.log(event)

  }
  add(event) {
    this.temp.push(event.value);
    this.partCtrl.setValue(null);
    console.log(event);
  }
  remove(part) {
    const index = this.temp.indexOf(part)
    this.temp.splice(index, 1)
  }

}
