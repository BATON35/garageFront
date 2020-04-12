import { ClientSearchAction } from './../client.state';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ClietnPageAction, RestoreClientAction } from '../client.state';
import { Observable, Subject } from 'rxjs';
import { PageClientDto } from 'src/api/models';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-client-restore',
  templateUrl: './client-restore.component.html',
  styleUrls: ['./client-restore.component.scss']
})
export class ClientRestoreComponent implements OnInit {
  subject: Subject<string> = new Subject();
  displayedColumns: string[] = [
    'id', 'name', 'email', 'restore'
  ];
  @Select(state => state.client.pageDeletedClientDto)
  clients$: Observable<PageClientDto>;

  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new ClietnPageAction(0, 5, true))
    this.subject.pipe(debounceTime(1000)).subscribe(text => {
      console.log('client-restore')
      this.store.dispatch(new ClientSearchAction(text, true));
    });
  }
  restore(id) {
    console.log("client Restore")
    this.store.dispatch(new RestoreClientAction(id))
  }

}
