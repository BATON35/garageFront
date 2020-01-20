import { UserDto } from './../../../api/models/user-dto';
import { UserControllerRestService } from 'src/api/services';
import { State, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { PageUserDto } from 'src/api/models';
import { empty } from 'rxjs';
export class ClearUserAction {
  static readonly type = '[User] ClearUserAction';
  constructor() { }
}
export class UsersPageAction {
  static readonly type = '[User] UsersPageAction';
  constructor(public page: number, public searchText: string, public size: number, public roles: string[]) { }
}
export class UsersDeleteAction {
  static readonly type = '[User] UsersDeleteAction';
  constructor(public id: number) { }
}
export class UserUpdateAction {
  static readonly type = '[User] UserUpdateAction';
  constructor(public userDto: UserDto) { }
}
export class UserSearchAction {
  static readonly type = '[User] UserSearchAction';
  constructor(public searchText: string, public roles: string[]) { }
}

export class BackToDefoultUserAction {
  static readonly type = '[User] BackToDefoultUserAction';
  constructor() { }
}
export class LoadUserByChangRoleAction {
  static readonly type = '[User] LoadUserByChangRoleAction';
  constructor(public roles: string[]) { }
}
export class UsersStateModel {
  userPage: PageUserDto;
  page: number;
  searchText: string;
  size: number;
  errorMessage: string;
  ok: boolean;
  roles: string[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    userPage: {},
    page: 0,
    searchText: '',
    size: 5,
    errorMessage: null,
    ok: false,
    roles: []
  }
})
export class UsersState {
  constructor(public userService: UserControllerRestService) { }

  @Action(UsersPageAction)
  add(ctx: StateContext<UsersStateModel>, { page, searchText, size, roles }: UsersPageAction) {
    return this.userService
      .searchUsersUsingGET({ size, searchText, page, roles })
      .pipe(
        tap(value => {
          ctx.patchState({
            userPage: value,
            page,
            searchText,
            size
          });
        })

      );
  }
  @Action(UsersDeleteAction)
  delete(ctx: StateContext<UsersStateModel>, { id }: UsersDeleteAction) {
    return this.userService
      .deleteUserUsingDELETE(id).pipe(tap(value => {
        const page = ctx.getState().page;
        const searchText = ctx.getState().searchText;
        const size = ctx.getState().size;
        const roles = ctx.getState().roles;
        ctx.dispatch(new UsersPageAction(page, searchText, size, roles));
      }));
  }

  @Action(UserUpdateAction)
  update(ctx: StateContext<UsersStateModel>, { userDto }: UserUpdateAction) {
    return this.userService.updateUserUsingPUT(userDto).pipe(tap(value => {
      const page = ctx.getState().page;
      const searchText = ctx.getState().searchText;
      const size = ctx.getState().size;
      const roles = ctx.getState().roles;
      ctx.dispatch(new UsersPageAction(page, searchText, size, roles));
      ctx.patchState({
        ok: true
      });
    }), catchError(error => {
      return empty();
    }));
  }
  @Action(UserSearchAction)
  search(ctx: StateContext<UsersStateModel>, { searchText, roles }: UserSearchAction) {
    return this.userService.searchUsersUsingGET({ size: ctx.getState().size, searchText, page: 33, roles }).pipe(
      tap(
        user => {
          ctx.patchState({
            userPage: user
          });
        }
      )
    );
  }
  @Action(BackToDefoultUserAction)
  backToDefoultUser(ctx: StateContext<UsersStateModel>, BackToDefoultUserAction) {
    ctx.patchState({
      userPage: {},
      page: 0,
      size: 5
    });
  }
  @Action(LoadUserByChangRoleAction)
  loadUserByChangeRole(ctx: StateContext<UsersStateModel>, { roles }: LoadUserByChangRoleAction) {
    ctx.dispatch(new UsersPageAction(ctx.getState().page, '', ctx.getState().size, roles));
    ctx.patchState({
      roles
    });
  }
  @Action(ClearUserAction)
  clearVehicle(ctx: StateContext<UsersStateModel>, { }: ClearUserAction) {
    ctx.patchState({
      errorMessage: null,
      ok: false
    });
  }
}
