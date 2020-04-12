import { AuthState } from './../../state/auth.state';
import { WebSocketService } from './../web-socket.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.scss']
})
export class WebSocketComponent implements OnInit {

  constructor(public webSocketService: WebSocketService, public store: Store) { }

  ngOnInit() {
    this.webSocketService.conect(this.store.selectSnapshot(AuthState.getToken));
  }

}
