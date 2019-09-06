import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public store: Store, public router: Router) {}
  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    const token: string = this.store.selectSnapshot<string>(
      state => state.auth.jwtToken
    );
    if (token) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
