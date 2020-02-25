import { MatDialog } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageCarServiceDto, CarServiceDto } from 'src/api/models';
import { LoadServiceCarPageAction, DeleteServiceCarAction } from '../state/service-car.state';
import { ServiceCreateComponent } from '../service-create/service-create.component';

@Component({
  selector: 'app-service-car',
  templateUrl: './service-car.component.html',
  styleUrls: ['./service-car.component.scss']
})
export class ServiceCarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'update', 'delete'];
  @Select(state => state.serviceCar.pageCarServiceDto)
  sevrice$: Observable<PageCarServiceDto>;
  constructor(public store: Store, public matDialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new LoadServiceCarPageAction(0, 5));
  }
  changePage(event) {
    this.store.dispatch(new LoadServiceCarPageAction(event.pageIndex, event.pageSize));
  }
  openModal() {
    this.matDialog.open(ServiceCreateComponent, {
      width: '500px'
    });
  }
  deleteElement(id) {
    this.store.dispatch(new DeleteServiceCarAction(id));
  }
  update(carServiceDto: CarServiceDto) {

    this.matDialog.open(ServiceCreateComponent, {
      width: '500px',
      data: carServiceDto
    });
  }
}

