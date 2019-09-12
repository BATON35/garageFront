import { ClientCreateComponent } from './../client-create/client-create.component';
import { MatDialog } from '@angular/material';
import { ClietnPageAction } from './../client.state';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageClientDto } from 'src/api/models';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ["id", "clientName", "email", "action", "action2"]
  @Select(state => state.client.pageClientDto)
  clients$: Observable<PageClientDto>

  constructor(public store: Store, public matDialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new ClietnPageAction(0, 5))
  }

  openModal() {
    this.matDialog.open(ClientCreateComponent, { width: "500px" })
  }

}
