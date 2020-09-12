import { AuthState } from './state/auth.state';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketService {
    stompClient;

    constructor(public store: Store) { }

    connect() {
        console.log('connect !!!!!!!!!!!!!!!!')
        const sockjs = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(sockjs);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe('/topic/test', function (sdkaEvent) {
                console.log(sdkaEvent);
            })
        }, this.handleError);
    }
    connectUser(token: string) {
        const sockjs = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(sockjs);
        const _this = this;
        const userId = this.store.selectSnapshot(AuthState.currentUser).id;
        _this.stompClient.connect({ Authorization: token }, function (frame) {
            console.log(frame)
            _this.stompClient.subscribe('/topic/notify/' + userId, function (sdkaEvent) {
                console.log(sdkaEvent);
            })
        }, this.handleError);
    }
    handleError(error) {
        console.log(error);
    }
    send() {
        this.stompClient.send('/app/hello', {}, "message from send method!!!");
    }
}