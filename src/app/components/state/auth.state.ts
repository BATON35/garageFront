import { Router } from "@angular/router";
import { UserDto } from "./../../../api/models/user-dto";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { JwtResponse } from "src/app/model/jwt-response";
import { UserControllerRestService } from "src/api/services";

const name = "auth";
const fullName = "[" + name + "]";

export class LoginAction {
  static readonly type = "${fullName} Login";
  constructor(public userName: string, public password: string) {}
}

export class RegistrationAction {
  static readonly type = "${fullName} Registration";
  constructor(public userDto: UserDto) {}
}

export class LogoutAction {
  static readonly type = "${fullName} Logout";
  constructor() {}
}

export class AuthStateModel {
  public jwtToken: string;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    jwtToken: ""
  }
})
export class AuthState {
  constructor(
    public httpClient: HttpClient,
    public userControllerRestService: UserControllerRestService,
    public router: Router
  ) {}
  @Action(LoginAction)
  login(
    ctx: StateContext<AuthStateModel>,
    { userName, password }: LoginAction
  ) {
    const form = new FormData();
    form.append("userName", userName);
    form.append("password", password);
    return this.httpClient
      .post<JwtResponse>("http://localhost:8080/login", form)
      .pipe(
        tap(({ token, expirationDate }) => {
          ctx.patchState({
            jwtToken: token
          });
          this.router.navigate(["/panel"]);
        })
      );
  }
  @Selector()
  static getToken(auth: AuthStateModel) {
    return auth.jwtToken;
  }
  @Action(RegistrationAction)
  registration(ctx: StateContext<AuthStateModel>, userDto: RegistrationAction) {
    return this.userControllerRestService
      .saveUsingPOST1(userDto.userDto)
      .pipe(tap(value => console.log(value)));
  }
  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>, LogoutAction) {
    ctx.patchState({ jwtToken: null });
  }
}
