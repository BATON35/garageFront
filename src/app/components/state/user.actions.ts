export class UserAction {
  static readonly type = '[User] Add item';
  constructor(public payload: string) { }
}
