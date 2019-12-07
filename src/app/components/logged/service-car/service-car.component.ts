import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageCarServiceDto } from 'src/api/models';
import { LoadServiceCarPageAction } from '../state/service-car.state';

@Component({
  selector: 'app-service-car',
  templateUrl: './service-car.component.html',
  styleUrls: ['./service-car.component.scss']
})
export class ServiceCarComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "price", "update"]
  @Select(state => state.serviceCar.pageCarServiceDto)
  sevrice$: Observable<PageCarServiceDto>
  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadServiceCarPageAction(0, 5))
  }

}
