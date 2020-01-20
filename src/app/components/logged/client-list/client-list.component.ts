import { VehicleDetailsComponent } from './../vehicle-details/vehicle-details.component';
import { VehicleCreateComponent } from './../vehicle-create/vehicle-create.component';
import { VehicleDto } from './../../../../api/models/vehicle-dto';
import { ClientCreateComponent } from './../client-create/client-create.component';
import { MatDialog } from '@angular/material';
import { ClietnPageAction, ClientDeleteAction, ClientSearchAction, AutocompleteAction } from './../client.state';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageClientDto, ClientDto } from 'src/api/models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VehicleDeleteAction, ToggleNotificationAction } from '../vehicle.state';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { VehicleHistoryComponent } from '../vehicle-history/vehicle-history.component';
import { DownloadVehicleHistoryAction } from '../state/file.state';


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

  constructor(
    public store: Store,
    public matDialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    public translateService: TranslateService) { }
  selectedLanguage = null;
  displayedColumns: string[] = [
    'id', 'name', 'email', 'update', 'addVehicle', 'delete'
  ];
  displayedVehiclesColumns: string[] = [
    'id', 'brand', 'model', 'numberPlate', 'update', 'delete', 'details', 'notification', 'service', 'history'
  ];
  @Select(state => state.client.pageClientDto)
  clients$: Observable<PageClientDto>;
  @Select(state => state.client.autocomplete)
  autocomplete$: Observable<string[]>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  expandedElement: any;

  public isExpansionDetailRow = (i: number, row: ClientDto) => row.vehicles.length > 0;

  ngOnInit() {
    this.store.dispatch(new ClietnPageAction(0, 5));
    this.translateService.setDefaultLang('pl');
    setTimeout(() => { this.selectedLanguage = 'pl'; }, 0);
  }

  changePage(event) {
    this.store.dispatch(new ClietnPageAction(event.pageIndex, event.pageSize));
  }

  openModal() {
    this.matDialog.open(ClientCreateComponent, { width: '500px' });
  }

  delete(id) {
    this.store.dispatch(new ClientDeleteAction(id));
  }

  update(client: ClientDto) {
    this.matDialog.open(ClientCreateComponent, {
      width: '500px',
      data: client
    });
  }
  addVehicle(vehicle: VehicleDto, clientId: number) {
    this.matDialog.open(VehicleCreateComponent, {
      width: '500px',
      data: {
        vehicleDto: vehicle,
        client: clientId
      }
    });
  }
  updateVehicle(vehicle: VehicleDto) {
    this.matDialog.open(VehicleCreateComponent, {
      width: '500px',
      data: {
        vehicleDto: vehicle
      }
    });
  }
  deleteVehicle(id) {
    this.store.dispatch(new VehicleDeleteAction(id));
  }
  updateVehicleDetails(vehicle: VehicleDto) {
    this.matDialog.open(VehicleDetailsComponent, {
      width: '500px',
      data: vehicle
    });
  }
  changeNotification(id) {
    this.store.dispatch(new ToggleNotificationAction(id));
  }
  search(searchText) {
    this.store.dispatch(new ClientSearchAction(searchText));
    this.store.dispatch(new AutocompleteAction(searchText));
  }
  showHistory(vehicle) {
    this.matDialog.open(VehicleHistoryComponent, {
      width: '100%',
      data: vehicle
    });
  }
  downloadVehicleHistory(id) {
    this.store.dispatch(new DownloadVehicleHistoryAction(id));
  }
}
