import { UserDto } from './../../../../api/models/user-dto';
import { UserCreateComponent } from './../user-create/user-create.component';
import { UsersPageAction, UsersDeleteAction, UserSearchAction, LoadUserByChangRoleAction } from './../users.state';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PageUserDto } from 'src/api/models';
import { MatDialog } from '@angular/material';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewChecked {

  selectedRoles: string[];
  checked = false;
  displayedColumns: string[] = ['id', 'userName', 'email', 'update', 'delete'];
  roles = [
    {
      label: 'Employee',
      value: 'ROLE_EMPLOYEE'
    },
    {
      label: 'Admin',
      value: 'ROLE_ADMIN'
    },
    {
      label: 'User',
      value: 'ROLE_USER'
    }
  ]

  @Select(state => state.users.userPage)
  users$: Observable<PageUserDto>;
  constructor(
    public store: Store,
    public matDialog: MatDialog,
    public changeDetectorRef: ChangeDetectorRef) { }


  ngOnInit() {
    this.store.dispatch(new UsersPageAction(0, '', 5, null));
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  changePage(event) {
    console.log(event)
    this.store.dispatch(new UsersPageAction(event.pageIndex, '', event.pageSize, this.selectedRoles));
  }
  delete(id) {
    this.store.dispatch(new UsersDeleteAction(id));
  }
  addUser() {
    this.matDialog.open(UserCreateComponent, {
      width: '800px'
    });
  }
  update(user: UserDto) {
    this.matDialog.open(UserUpdateComponent, {
      width: '500px',
      data: user
    });
  }
  search(searchText) {
    this.store.dispatch(new UserSearchAction(searchText, this.selectedRoles));
  }
  role(roles) {
    this.selectedRoles = roles;
    this.store.dispatch(new LoadUserByChangRoleAction(roles));
  }
}
