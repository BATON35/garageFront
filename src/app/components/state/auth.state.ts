import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserDto } from './../../../api/models/user-dto';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { JwtResponse } from 'src/app/model/jwt-response';
import { UserControllerRestService } from 'src/api/services';
import { of } from 'rxjs';
import Cookies from 'js-cookie';
import { Navigate } from '@ngxs/router-plugin';


export class UpdateTokenAction {
  static readonly type = '[Auth] UpdateTokenAction';
  constructor(public token: string) { }
}
export class LoginAction {
  static readonly type = '[Auth] LoginAction';
  constructor(public userLogin: string, public password: string) { }
}

export class RegistrationAction {
  static readonly type = '[Auth] RegistrationAction';
  constructor(public userDto: UserDto) { }
}

export class LogoutAction {
  static readonly type = '[Auth] LogoutAction';
  constructor() { }
}
export class CurrentUserAction {
  static readonly type = '$[Auth] CurrentUserAction';
  constructor() { }
}
export class ErrorLoginToFalseAction {
  static readonly type = '[Auth] ErrorLoginToFalseAction';
  constructor() { }
}
export class ErrorRegistrationToFalseAction {
  static readonly type = '[Auth] ErrorRegistrationToFalseAction';
  constructor() { }
}

export class LoginFromCookieAction {
  static readonly type = '[Auth] LoginFromCookieAction';
  constructor() { }
}

export class BackToDefoultAuthAction {
  static readonly type = '[Auth] BackToDefoultAuthAction';
  constructor() { }
}
export class AuthStateModel {
  public jwtToken: string;
  public currentUser: UserDto;
  public errorLogin: boolean;
  public errorRegister: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    errorLogin: false,
    errorRegister: false,
    jwtToken: null,
    currentUser: null
  }
})

export class AuthState {
  constructor(
    public httpClient: HttpClient,
    public userControllerRestService: UserControllerRestService,
    public matSnackBar: MatSnackBar
  ) { }

  @Selector()
  static currentUser(state: AuthStateModel) {
    return state.currentUser;
  }


  @Selector()
  static getToken(auth: AuthStateModel) {
    return auth.jwtToken;
  }
  @Action(LoginAction)
  login(
    ctx: StateContext<AuthStateModel>,
    { userLogin, password }: LoginAction
  ) {
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const form = new FormData();
    form.append('userLogin', userLogin);
    form.append('password', password);
    if (!Cookies.get('jwtToken')) {
      return this.httpClient
        .post<JwtResponse>('http://localhost:8080/login', form)
        .pipe(
          tap(({ token, expirationDate }) => {
            ctx.patchState({
              jwtToken: token,
              errorLogin: false
            });
            Cookies.set('jwtToken', token);
            ctx.dispatch(new CurrentUserAction());
            (async () => {
              await delay(30);
              ctx.dispatch(new Navigate(['/panel']));
            })();

          }),
          catchError((a, b) => {
            ctx.patchState({
              errorLogin: true
            });
            return of();

          })
        );
    } else {
      ctx.patchState({
        jwtToken: Cookies.get('jwtToken')
      });
      ctx.dispatch(new CurrentUserAction());
      ctx.dispatch(new Navigate(['/panel']));
    }
  }
  @Action(CurrentUserAction)
  getUserInfo(
    ctx: StateContext<AuthStateModel>, CurrentUserAction) {
    return this.userControllerRestService.userInfoUsingGET().pipe(tap(value => {
      ctx.patchState({
        currentUser: value
      });
    }));
  }

  @Action(RegistrationAction)
  registration(ctx: StateContext<AuthStateModel>, userDto: RegistrationAction) {
    return this.userControllerRestService
      .saveUserUsingPOST(userDto.userDto)
      .pipe(
        tap(value => {
          ctx.patchState({ errorRegister: false });
        }),
        catchError((a, b) => {
          console.log("error b")
          console.log(b)
          console.log("error a")
          console.log(a)
          ctx.patchState({
            errorRegister: true
          });
          if (a.status === 409) {
            this.matSnackBar.open('Podany login jest zajety', 'zamkinij', { duration: 3000 });
          }
          return of();
        }));
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>, LogoutAction) {
    ctx.patchState({
      jwtToken: null,
      currentUser: null
    });
    Cookies.remove('jwtToken');
  }

  @Action(ErrorLoginToFalseAction)
  errorLoginToFalse(ctx: StateContext<AuthStateModel>, ErrorLoginToFalseAction) {
    ctx.patchState({ errorLogin: false });
  }
  @Action(ErrorRegistrationToFalseAction)
  errorRegistrationToFalse(ctx: StateContext<AuthStateModel>, ErrorRegistrationToFalseAction) {
    ctx.patchState({ errorRegister: false });
  }
  @Action(LoginFromCookieAction)
  loginFromCookie(ctx: StateContext<AuthStateModel>, LoginFromCookieAction) {
    if (Cookies.get('jwtToken')) {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      ctx.patchState({ jwtToken: Cookies.get('jwtToken') });
      ctx.dispatch(new CurrentUserAction());
      (async () => {
        await delay(30);
        ctx.dispatch(new Navigate(['/panel']));
      })();
    }
  }
  @Action(BackToDefoultAuthAction)
  backToDefoultAuth(ctx: StateContext<AuthStateModel>, BackToDefoultauthAction) {
    ctx.patchState({
      errorLogin: false,
      errorRegister: false,
      jwtToken: null,
      currentUser: null
    });
  }
  @Action(UpdateTokenAction)
  updateToken(ctx: StateContext<AuthStateModel>, { token }: UpdateTokenAction) {
    ctx.patchState({
      jwtToken: token
    }
    );
  }
}
