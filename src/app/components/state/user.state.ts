import { State, Action, StateContext } from '@ngxs/store';
import { UserAction } from './user.actions';

export class UserStateModel {
  public items: string[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    items: []
  }
})
export class UserState {
  @Action(UserAction)
  add(ctx: StateContext<UserStateModel>, action: UserAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
