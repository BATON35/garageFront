import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/api/models';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  @Select(state => state.auth.currentUser)
  user$: Observable<UserDto>;
  constructor() { }

  ngOnInit() {
  }

  onTabChange(event) {
    console.log("contor-panel")
    console.log(event)
  }
}
