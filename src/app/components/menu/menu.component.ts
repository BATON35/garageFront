import { LogoutAction } from "./../state/auth.state";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  constructor(
    public store: Store,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {}
  logout() {
    this.store.dispatch(new LogoutAction());
  }
}
