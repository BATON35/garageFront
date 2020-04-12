import { UserDto } from './../../../api/models/user-dto';
import { UserControllerRestService } from 'src/api/services';
import { State, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { PageUserDto } from 'src/api/models';
import { empty } from 'rxjs';
import { MatSnackBar } from '@angular/material';
export class ClearUserAction {
  static readonly type = '[User] ClearUserAction';
  constructor() { }
}
export class UsersPageAction {
  static readonly type = '[User] UsersPageAction';
  constructor(public page: number, public searchText: string, public size: number, public roles: string[], public deleted?: boolean) { }
}
export class UsersDeleteAction {
  static readonly type = '[User] UsersDeleteAction';
  constructor(public id: number) { }
}
export class UserUpdateAction {
  static readonly type = '[User] UserUpdateAction';
  constructor(public userDto: UserDto) { }
}
export class UserCreateAction {
  static readonly type = '[User] UserCreateAction';
  constructor(public userDto: UserDto) { }
}
export class UserSearchAction {
  static readonly type = '[User] UserSearchAction';
  constructor(public searchText: string, public roles: string[], public deleted?: boolean) { }
}

export class BackToDefoultUserAction {
  static readonly type = '[User] BackToDefoultUserAction';
  constructor() { }
}
export class LoadUserByChangRoleAction {
  static readonly type = '[User] LoadUserByChangRoleAction';
  constructor(public roles: string[]) { }
}

export class ChangePasswordAction {
  static readonly type = '[User] ChangePasswordAction';
  constructor(public password: string) { }
}
export class RestoreUserAction {
  static readonly type = '[User] RestoreUserAction';
  constructor(public id: number) { }
}

export class UsersStateModel {
  userPage: PageUserDto;
  deletedUserPage: PageUserDto;
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
    deletedUserPage: {},
    page: 0,
    searchText: '',
    size: 5,
    errorMessage: null,
    ok: false,
    roles: []
  }
})
export class UsersState {
  constructor(
    public userService: UserControllerRestService,
    public matSnackBar: MatSnackBar) { }

  @Action(UsersPageAction)
  add(ctx: StateContext<UsersStateModel>, { page, searchText, size, roles, deleted }: UsersPageAction) {
    return this.userService
      .searchUsersUsingGET({ size, searchText, page, roles, deleted })
      .pipe(
        tap(value => {
          if (!deleted) {
            ctx.patchState({
              userPage: value,
              page,
              searchText,
              size,
            });
          } else {
            ctx.patchState({
              deletedUserPage: value,
              page,
              searchText,
              size,
            });
          }
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
        this.matSnackBar.open("usunieto", "usnieto", { duration: 2000 });
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
    }), catchError(err => {
      ctx.patchState({
        errorMessage: err.error.message
      });
      return empty();
    }));
  }

  @Action(UserCreateAction)
  create(ctx: StateContext<UsersStateModel>, { userDto }: UserCreateAction) {
    return this.userService.saveUserUsingPOST(userDto).pipe(tap(value => {
      const page = ctx.getState().page;
      const searchText = ctx.getState().searchText;
      const size = ctx.getState().size;
      const roles = ctx.getState().roles;
      ctx.dispatch(new UsersPageAction(page, searchText, size, roles));
      ctx.patchState({
        ok: true
      });
    }), catchError(error => {
      // =======
      //       const hasRole = ctx.getState().hasRole;
      //       ctx.dispatch(new UsersPageAction(page, searchText, size, hasRole));
      //       ctx.patchState({
      //         ok: true
      //       });
      //     }), catchError(err => {
      //       ctx.patchState({
      //         errorMessage: err.error.message
      //       });
      // >>>>>>> feature/translation
      return empty();
    }));
  }
  @Action(UserSearchAction)
  search(ctx: StateContext<UsersStateModel>, { searchText, roles, deleted }: UserSearchAction) {
    return this.userService.searchUsersUsingGET({ size: ctx.getState().size, searchText, page: 0, roles, deleted }).pipe(
      tap(
        user => {
          if (!deleted) {
            ctx.patchState({
              userPage: user,
            });
          } else {
            ctx.patchState({
              deletedUserPage: user,
            });
          }
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
  @Action(ChangePasswordAction)
  changePassword(ctx: StateContext<UsersStateModel>, { password }: ChangePasswordAction) {
    return this.userService.changePasswordUsingPOST({ password });
  }

  @Action(RestoreUserAction)
  restoreUser(ctx: StateContext<UsersStateModel>, { id }: RestoreUserAction) {
    return this.userService.restoreUserUsingPUT(id).pipe(tap(user => {
      const page = ctx.getState().page;
      const size = ctx.getState().size;
      ctx.dispatch(new UsersPageAction(page, '', size, null, true));
      this.matSnackBar.open("przywrócono", "ok", { duration: 2000 });
    }));
  }

}
