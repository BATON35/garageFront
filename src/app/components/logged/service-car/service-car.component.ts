import { MatDialog } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageCarServiceDto } from 'src/api/models';
import { LoadServiceCarPageAction } from '../state/service-car.state';
import { ServiceCreateComponent } from '../service-create/service-create.component';

@Component({
  selector: 'app-service-car',
  templateUrl: './service-car.component.html',
  styleUrls: ['./service-car.component.scss']
})
export class ServiceCarComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "price", "update"]
  @Select(state => state.serviceCar.pageCarServiceDto)
  sevrice$: Observable<PageCarServiceDto>
  constructor(public store: Store, public matDialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new LoadServiceCarPageAction(0, 5))
  }
  changePage(event) {
    this.store.dispatch(new LoadServiceCarPageAction(event.pageIndex, event.pageSize));
    console.log(event)
  }
  openModal() {
    this.matDialog.open(ServiceCreateComponent);
  }

}
