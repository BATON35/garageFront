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
  constructor(public page: number, public searchText: string, public size: number, public hasRole: boolean) { }
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
  constructor(public searchText: string, public hasRole: boolean) { }
}

export class BackToDefoultUserAction {
  static readonly type = '[User] BackToDefoultUserAction';
  constructor() { }
}
export class LoadUserByChangRoleAction {
  static readonly type = '[User] LoadUserByChangRoleAction';
  constructor(public hasRole: boolean) { }
}
export class UsersStateModel {
  userPage: PageUserDto;
  page: number;
  searchText: string;
  size: number;
  hasRole: boolean;
  errorMessage: string;
  ok: boolean;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    userPage: {},
    page: 0,
    searchText: '',
    size: 5,
    hasRole: false,
    errorMessage: null,
    ok: false
  }
})
export class UsersState {
  constructor(public userService: UserControllerRestService) { }

  @Action(UsersPageAction)
  add(ctx: StateContext<UsersStateModel>, { page, searchText, size, hasRole }: UsersPageAction) {
    return this.userService
      .searchUsersUsingGET({ size, searchText, page, hasRole })
      .pipe(
        tap(value => {
          ctx.patchState({
            userPage: value,
            page,
            searchText,
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
        const page = ctx.getState().page;
        const searchText = ctx.getState().searchText;
        const size = ctx.getState().size;
        const hasRole = ctx.getState().hasRole;
        ctx.dispatch(new UsersPageAction(page, searchText, size, hasRole));
      }));
  }

  @Action(UserUpdateAction)
  update(ctx: StateContext<UsersStateModel>, { userDto }: UserUpdateAction) {
    return this.userService.updateUserUsingPUT(userDto).pipe(tap(value => {
      const page = ctx.getState().page;
      const searchText = ctx.getState().searchText;
      const size = ctx.getState().size;
      const hasRole = ctx.getState().hasRole;
      ctx.dispatch(new UsersPageAction(page, searchText, size, hasRole));
      console.log('UserUpdateAction!!!!!!');
      ctx.patchState({
        ok: true
      });
    }), catchError(error => {
      return empty();
    }));
  }
  @Action(UserSearchAction)
  search(ctx: StateContext<UsersStateModel>, { searchText, hasRole }: UserSearchAction) {
    return this.userService.searchUsersUsingGET({ size: ctx.getState().size, searchText, page: 0, hasRole }).pipe(
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
  loadUserByChangeRole(ctx: StateContext<UsersStateModel>, { hasRole }: LoadUserByChangRoleAction) {
    ctx.dispatch(new UsersPageAction(ctx.getState().page, '', ctx.getState().size, hasRole));
    ctx.patchState({
      hasRole
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
