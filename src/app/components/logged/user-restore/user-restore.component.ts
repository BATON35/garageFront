import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PageUserDto } from 'src/api/models';
import { UsersPageAction, RestoreUserAction, UserSearchAction } from '../users.state';

@Component({
  selector: 'app-user-restore',
  templateUrl: './user-restore.component.html',
  styleUrls: ['./user-restore.component.scss']
})
export class UserRestoreComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'name', 'email', 'restore', 'modifiedBy'
  ];
  @Select(state => state.users.deletedUserPage)
  users$: Observable<PageUserDto>;
  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new UsersPageAction(0, "", 5, null, true))
  }
  restore(id) {
    this.store.dispatch(new RestoreUserAction(id));
  }
  search(text) {
    this.store.dispatch(new UserSearchAction(text, null, true));
  }
  changePage(event) {
    this.store.dispatch(new UsersPageAction(event.pageIndex, '', event.pageSize, [], true));
  }
}
