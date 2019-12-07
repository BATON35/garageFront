import { BackToDefoultAuthAction } from './../state/auth.state';
import { UserDto } from './../../../api/models/user-dto';
import { UserControllerRestService } from "src/api/services";
import { State, Action, StateContext, UpdateState } from "@ngxs/store";
import { tap, catchError } from "rxjs/operators";
import { PageUserDto } from "src/api/models";
import { empty } from 'rxjs';

const name = "[Users]";
export class UsersPageAction {
  static readonly type = '${name} usersPage';
  constructor(public page: number, public size: number, public hasRole: boolean) { }
}


export class UsersDeleteAction {
  static readonly type = '${name} delete user';
  constructor(public id: number) { }
}

export class UserUpdateAction {
  static readonly type = '${name} update user';
  constructor(public userDto: UserDto) { }
}
export class UserSearchAction {
  static readonly type = '${name} search user';
  constructor(public searchText: string) { }
}

export class BackToDefoultUserAction {
  static readonly type = '${name} back to defoult';
  constructor() { }
}
export class LoadUserByChangRoleAction {
  static readonly type = '${name} load user by change role';
  constructor(public hasRole: boolean) { }
}
export class UsersStateModel {
  userPage: PageUserDto;
  page: number;
  size: number;
  hasRole: boolean;
}

@State<UsersStateModel>({
  name: "users",
  defaults: {
    userPage: {},
    page: 0,
    size: 5,
    hasRole: false
  }
})
export class UsersState {
  constructor(public userService: UserControllerRestService) { }

  @Action(UsersPageAction)
  add(ctx: StateContext<UsersStateModel>, { page, size, hasRole }: UsersPageAction) {
    return this.userService
      .getUserListUsingGET({ size: size, page: page, hasRole })
      .pipe(
        tap(value => {
          console.log(value)
          ctx.patchState({
            userPage: value,
            page,
            size,
            hasRole
          });
        })

      );
  }
  @Action(UsersDeleteAction)
  delete(ctx: StateContext<UsersStateModel>, { id }: UsersDeleteAction) {
    return this.userService
      .deleteUserUsingDELETE(id).pipe(tap(value => {
        const page = ctx.getState().page
        const size = ctx.getState().size
        const hasRole = ctx.getState().hasRole
        ctx.dispatch(new UsersPageAction(page, size, hasRole))
      }));
  }

  @Action(UserUpdateAction)
  update(ctx: StateContext<UsersStateModel>, { userDto }: UserUpdateAction) {
    return this.userService.updateUserUsingPUT(userDto).pipe(tap(value => {
      const page = ctx.getState().page
      const size = ctx.getState().size
      const hasRole = ctx.getState().hasRole
      ctx.dispatch(new UsersPageAction(page, size, hasRole))
    }), catchError(error => {
      console.log(error)
      return empty();
    }));
  }
  @Action(UserSearchAction)
  search(ctx: StateContext<UsersStateModel>, { searchText }: UserSearchAction) {
    return this.userService.searchUsersUsingGET({ searchText, page: 0, size: ctx.getState().size }).pipe(
      tap(
        user => {
          ctx.patchState({
            userPage: user
          })
        }
      )
    )
  }
  @Action(BackToDefoultUserAction)
  backToDefoultUser(ctx: StateContext<UsersStateModel>, BackToDefoultUserAction) {
    ctx.patchState({
      userPage: {},
      page: 0,
      size: 5
    })
  }
  @Action(LoadUserByChangRoleAction)
  loadUserByChangeRole(ctx: StateContext<UsersStateModel>, { hasRole }: LoadUserByChangRoleAction) {
    ctx.dispatch(new UsersPageAction(ctx.getState().page, ctx.getState().size, hasRole))
    ctx.patchState({
      hasRole: hasRole
    })
  }
}
