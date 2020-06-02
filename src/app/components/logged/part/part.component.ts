import { PartDto } from './../../../../api/models/part-dto';
import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PagePartDto } from 'src/api/models';
import { LoadPartPageAction, DeletePartAction } from '../state/part.state';
import { PartCreateComponent } from '../part-create/part-create.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'update', 'delete'];
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
  delete(id) {
    this.store.dispatch(new DeletePartAction(id))
  }
  update(partDto: PartDto) {
    this.matDialog.open(PartCreateComponent, {
      width: '500px',
      data: partDto
    });
  }
}
