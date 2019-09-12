import { UserDto } from './../../../../api/models/user-dto';
import { UserCreateComponent } from './../user-create/user-create.component';
import { UsersPageAction, UsersDeleteAction } from "./../users.state";
import { Store, Select } from "@ngxs/store";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { PageUserDto } from 'src/api/models';
import { PageEvent, MatDialog } from '@angular/material';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["id", "userName", "email", "action", "action2"]

  @Select(state => state.users.userPage)
  users$: Observable<PageUserDto>
  constructor(public store: Store, public matDialog: MatDialog) { }


  ngOnInit() {
    this.store.dispatch(new UsersPageAction(0, 5));
  }
  changePage(event) {
    console.log(event)
    this.store.dispatch(new UsersPageAction(event.pageIndex, event.pageSize))
  }
  delete(id) {
    this.store.dispatch(new UsersDeleteAction(id))
  }
  openModal() {
    this.matDialog.open(UserCreateComponent, {
      width: "500px"
    })
  }
  update(user: UserDto) {
    this.matDialog.open(UserCreateComponent, {
      width: "500px",
      data: user
    })
    console.log(user)
  }
}