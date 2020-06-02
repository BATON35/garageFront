import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/api/models';
import { ClietnPageAction } from '../client.state';
import { UsersPageAction } from '../users.state';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  @Select(state => state.auth.currentUser)
  user$: Observable<UserDto>;
  constructor(public store: Store) { }

  ngOnInit() {
  }

  onTabChange(event) {
    console.log("contor-panel index")
    console.log(event.index)
    if (event.index === 0) {
      this.store.dispatch(new ClietnPageAction(0, 5, false));
    }
    if (event.index === 1) {
      this.store.dispatch(new UsersPageAction(0, '', 5, null, false));
    }
    if (event.index === 2) {
      this.store.dispatch(new ClietnPageAction(0, 5, true));
      this.store.dispatch(new UsersPageAction(0, '', 5, null, true));
    }

  }

  checkRole(user: UserDto, roleName: string): boolean {
    return user.roles.filter(r => r.name === roleName).length > 0;
  }
}
