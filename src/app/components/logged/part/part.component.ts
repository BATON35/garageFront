import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PagePartDto } from 'src/api/models';
import { LoadPartPageAction } from '../state/part.state';
import { PartCreateComponent } from '../part-create/part-create.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'update'];
  @Select(state => state.part.pagePart)
  part$: Observable<PagePartDto>;

  constructor(public store: Store, public matDialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new LoadPartPageAction(0, 5));
  }
  changePage(event) {
    this.store.dispatch(new LoadPartPageAction(event.pageIndex, event.pageSize));
  }
  openModal() {
    this.matDialog.open(PartCreateComponent, { width: '500px' });
  }




}
