import { state } from '@angular/animations';
import { Router } from '@angular/router';
import { UserDto } from './../../../api/models/user-dto';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { JwtResponse } from 'src/app/model/jwt-response';
import { UserControllerRestService } from 'src/api/services';
import { of } from 'rxjs';
import Cookies from 'js-cookie';

const name = 'auth';
const fullName = '[' + name + ']';

export class UpdateTokenAction {
  static readonly type = '${token} UpdateTokenAction';
  constructor(public token: string) { }
}
export class LoginAction {
  static readonly type = '${fullName} Login';
  constructor(public userName: string, public password: string) { }
}

export class RegistrationAction {
  static readonly type = '${fullName} Registration';
  constructor(public userDto: UserDto) { }
}

export class LogoutAction {
  static readonly type = '${fullName} Logout';
  constructor() { }
}
export class CurrentUserAction {
  static readonly type = '${fullName} UserInfo';
  constructor() { }
}
export class ErrorLoginToFalseAction {
  static readonly type = '${fullName} errorLoginToFalseAction';
  constructor() { }
}
export class ErrorRegistrationToFalseAction {
  static readonly type = '${fullName} errorRegistrationToFalseAction';
  constructor() { }
}

export class LoginFromCookieAction {
  static readonly type = '${fullName} loginFromCookieAction';
  constructor() { }
}

export class BackToDefoultAuthAction {
  static readonly type = '${fullName} back to defoult auth';
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
    currentUser: {}
  }
})
export class AuthState {
  constructor(
    public httpClient: HttpClient,
    public userControllerRestService: UserControllerRestService,
    public router: Router
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
    { userName, password }: LoginAction
  ) {
    const form = new FormData();
    form.append('userName', userName);
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
            console.log('login action ');
            console.log(token);
            Cookies.set('jwtToken', token);
            ctx.dispatch(new CurrentUserAction());
            this.router.navigate(['/panel']);
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
      this.router.navigate(['/panel']);
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
          console.log(value);
          ctx.patchState({ errorRegister: false });
        }),
        catchError((a, b) => {
          ctx.patchState({
            errorRegister: true
          });
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
      ctx.patchState({ jwtToken: Cookies.get('jwtToken') });
      ctx.dispatch(new CurrentUserAction());
      this.router.navigate(['/panel']);
    }
  }
  @Action(BackToDefoultAuthAction)
  backToDefoultAuth(ctx: StateContext<AuthStateModel>, BackToDefoultauthAction) {
    ctx.patchState({
      errorLogin: false,
      errorRegister: false,
      jwtToken: null,
      currentUser: {}
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
