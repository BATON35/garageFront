import { AuthState } from "./../components/state/auth.state";
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { first, flatMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public store: Store) { }

    intercept(
        req: import("@angular/common/http").HttpRequest<any>,
        next: import("@angular/common/http").HttpHandler
    ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        return this.store.select(AuthState.getToken).pipe(
            first(),
            flatMap(token => {
                console.log(token)
                const authRequest = !!token
                    ? req.clone({
                        setHeaders: {
                            Authorization: "Bearer " + token
                        }
                    })
                    : req;
                return next.handle(authRequest);
            })
        );
    }
}
