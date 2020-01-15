import { UserDto } from './../../../../api/models/user-dto';
import { UserCreateComponent } from './../user-create/user-create.component';
import { UsersPageAction, UsersDeleteAction, UserSearchAction, LoadUserByChangRoleAction } from './../users.state';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageUserDto } from 'src/api/models';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  checked: boolean = false;
  displayedColumns: string[] = ['id', 'userName', 'email', 'update', 'delete'];

  @Select(state => state.users.userPage)
  users$: Observable<PageUserDto>;
  constructor(public store: Store, public matDialog: MatDialog) { }


  ngOnInit() {
    this.store.dispatch(new UsersPageAction(0, '', 5, this.checked));
  }
  changePage(event) {
    this.store.dispatch(new UsersPageAction(event.pageIndex, '', event.pageSize, this.checked));
  }
  delete(id) {
    this.store.dispatch(new UsersDeleteAction(id));
  }
  openModal() {
    this.matDialog.open(UserCreateComponent, {
      width: '800px'
    });
  }
  update(user: UserDto) {
    this.matDialog.open(UserCreateComponent, {
      width: '500px',
      data: user
    });
  }
  search(searchText) {
    this.store.dispatch(new UserSearchAction(searchText, this.checked));
  }
  role(event) {
    this.store.dispatch(new LoadUserByChangRoleAction(this.checked));
  }
}
