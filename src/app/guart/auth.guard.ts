import { Role } from './../../api/models/role';
import { Store } from "@ngxs/store";
import { Injectable, RootRenderer } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthState } from '../components/state/auth.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public store: Store, public router: Router) { }
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
    console.log(route.data.role)
    if (token) {
      if (route.data.role) {
        const currentUser = this.store.selectSnapshot(AuthState.currentUser)
        if (currentUser.roles)
          return currentUser.roles.some(role => route.data.role.includes(role.name))
        else
          return false;
      }
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
