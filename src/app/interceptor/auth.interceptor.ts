import { AuthState, UpdateTokenAction } from './../components/state/auth.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { first, flatMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public store: Store) { }

    intercept(
        req: import('@angular/common/http').HttpRequest<any>,
        next: import('@angular/common/http').HttpHandler
    ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
        const token = this.store.selectSnapshot(AuthState.getToken);
        console.log('interceptor');
        console.log(token);
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            })
        }
        return next.handle(req).pipe(tap(event => {
            if (event instanceof (HttpResponse)) {
                console.log('event ' + event);
                console.log('event headers ' + event.headers.keys());
                console.log('event headers ' + event.headers.get('authorization'));
                this.store.dispatch(new UpdateTokenAction(event.headers.get('authorization')));
            }
        }));
    }
}
