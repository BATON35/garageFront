import { UserDto } from './../../../api/models/user-dto';
import { UserControllerRestService } from "src/api/services";
import { State, Action, StateContext, UpdateState } from "@ngxs/store";
import { tap, catchError } from "rxjs/operators";
import { PageUserDto } from "src/api/models";
import { empty } from 'rxjs';

const name = "[Users]";
export class UsersPageAction {
  static readonly type = '${name} usersPage';
  constructor(public page: number, public size: number) { }
}

export class UsersDeleteAction {
  static readonly type = '${name} add item';
  constructor(public id: number) { }
}

export class UserUpdateAction {
  static readonly type = '${name} update item';
  constructor(public userDto: UserDto) { }
}

export class UsersStateModel {
  userPage: PageUserDto;
  page: number;
  size: number;
}

@State<UsersStateModel>({
  name: "users",
  defaults: {
    userPage: {},
    page: 0,
    size: 5
  }
})
export class UsersState {
  constructor(public userService: UserControllerRestService) { }

  @Action(UsersPageAction)
  add(ctx: StateContext<UsersStateModel>, { page, size }: UsersPageAction) {
    return this.userService
      .getListUsingGET2({ size: size, page: page })
      .pipe(
        tap(value => {
          console.log(value)
          ctx.patchState({
            userPage: value,
            page,
            size
          });
        })

      );
  }
  @Action(UsersDeleteAction)
  delete(ctx: StateContext<UsersStateModel>, { id }: UsersDeleteAction) {
    return this.userService
      .deleteUsingDELETE1(id).pipe(tap(value => {
        const page = ctx.getState().page
        const size = ctx.getState().size
        ctx.dispatch(new UsersPageAction(page, size))
      }));
  }

  @Action(UserUpdateAction)
  update(ctx: StateContext<UsersStateModel>, { userDto }: UserUpdateAction) {
    return this.userService.updateUsingPUT1(userDto).pipe(tap(value => {
      const page = ctx.getState().page
      const size = ctx.getState().size
      ctx.dispatch(new UsersPageAction(page, size))
    }), catchError(error => {
      console.log(error)
      return empty();
    }));
  }

}
