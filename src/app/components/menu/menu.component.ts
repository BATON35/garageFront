import { AuthGuard } from './../../guart/auth.guard';
import { Router } from '@angular/router';
import { LogoutAction } from "./../state/auth.state";
import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDto } from 'src/api/models';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  currentUser

  @Select(state => state.auth.currentUser)
  user$: Observable<UserDto>

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  constructor(
    public store: Store,
    public breakpointObserver: BreakpointObserver,
    public router: Router
  ) { }

  ngOnInit() {
    this.user$.subscribe(value => this.currentUser = value)
  }
  logout() {
    this.store.dispatch(new LogoutAction());
    this.router.navigate(["/"])
  }

}
