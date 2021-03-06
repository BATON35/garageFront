import { UserDto } from './../../../../api/models/user-dto';
import { UserCreateComponent } from './../user-create/user-create.component';
import { UsersPageAction, UsersDeleteAction, UserSearchAction, LoadUserByChangRoleAction } from './../users.state';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageUserDto } from 'src/api/models';
import { MatDialog } from '@angular/material';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewChecked {
  subject: Subject<string> = new Subject();
  searchText: string = "";
  selectedRoles: string[];
  checked = false;
  displayedColumns: string[] = ['id', 'userName', 'email', 'update', 'delete'];
  roles = [
    {
      label: 'Pracownik',
      value: 'ROLE_EMPLOYEE'
    },
    {
      label: 'Admin',
      value: 'ROLE_ADMIN'
    },
    {
      label: 'User',
      value: 'ROLE_USER'
    },
    {
      label: 'No roles',
      value: null
    }
  ]

  @Select(state => state.users.userPage)
  users$: Observable<PageUserDto>;
  constructor(
    public store: Store,
    public matDialog: MatDialog,
    public changeDetectorRef: ChangeDetectorRef,
    public translateService: TranslateService) { }


  ngOnInit() {
    this.store.dispatch(new UsersPageAction(0, '', 5, null));
    this.subject.pipe(debounceTime(1000)).subscribe(text => {
      this.searchText = text;
      this.store.dispatch(new UserSearchAction(text, this.selectedRoles));
    });
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  changePage(event) {
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
  role(roles) {
    this.selectedRoles = [roles];
    this.store.dispatch(new UserSearchAction(this.searchText, this.selectedRoles));
  }
}
