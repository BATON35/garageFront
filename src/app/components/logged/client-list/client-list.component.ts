import { VehicleCreateComponent } from './../vehicle-create/vehicle-create.component';
import { VehicleDto } from './../../../../api/models/vehicle-dto';
import { ClientCreateComponent } from './../client-create/client-create.component';
import { MatDialog } from '@angular/material';
import { ClietnPageAction, ClientDeleteAction, ClientUpdateAction } from './../client.state';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageClientDto, ClientDto } from 'src/api/models';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "email", "vehicles", "update", "addVehicle", "delete"]
  displayedVehiclesColumns: string[] = ["id", "brand", "numberPlate", "update"]
  // expandedElement: any
  // isExpansionDetailRow = (i: number, row: Object) => {
  //   return row.hasOwnProperty('name');

  // }
  @Select(state => state.client.pageClientDto)
  clients$: Observable<PageClientDto>

  constructor(public store: Store, public matDialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new ClietnPageAction(0, 5))
  }

  changePage(event) {
    this.store.dispatch(new ClietnPageAction(event.pageIndex, event.pageSize))
  }

  openModal() {
    this.matDialog.open(ClientCreateComponent, { width: "500px" })
  }

  delete(id) {
    this.store.dispatch(new ClientDeleteAction(id))
  }

  update(client: ClientDto) {
    this.matDialog.open(ClientCreateComponent, {
      width: "500px",
      data: client
    })
  }
  addVehicle(vehicle: VehicleDto, clientId: number) {
    console.log("client list component !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    this.matDialog.open(VehicleCreateComponent, {
      width: "500px",
      data: {
        vehicleDto: vehicle,
        client: clientId
      }
    })
  }
  updateVehicle(vehicle: VehicleDto) {
    this.matDialog.open(VehicleCreateComponent, {
      width: "500px",
      data: {
        vehicleDto: vehicle
      }
    })
  }

}
