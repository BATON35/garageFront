import { UsersPageAction, UsersDeleteAction } from "./../users.state";
import { Store, Select } from "@ngxs/store";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { PageUserDto } from 'src/api/models';
import { PageEvent } from '@angular/material';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["id", "userName", "email", "action"]

  @Select(state => state.users.userPage)
  users$: Observable<PageUserDto>
  constructor(public store: Store) { }


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
}