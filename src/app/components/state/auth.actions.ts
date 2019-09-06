const name = "auth";
const fullName = "[" + name + "]";

export class LoginAction {
  static readonly type = "${fullName} Login";
  constructor(public userName: string, public password: string) {}
}
