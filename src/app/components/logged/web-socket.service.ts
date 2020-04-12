import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  stompClient: any;
  constructor() { }

  conect(token: string) {
    let sockJS = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(sockJS);
    let that = this;
    that.stompClient.connect({ Authorization: token }, frame => {
      that.stompClient.subscribe('/topic/test', event => {
        console.log(event)
      })
    });
  }
}
