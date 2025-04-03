import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, over , Message } from 'stompjs';
@Injectable({
    providedIn:'root',

})
export class WebsocketService {
    private stompClient:Client | null =null;
    private socketUrl = 'http://localhost:8080/ws';

    constructor() {
        this.connect();
    }
    connect(){
        const socket =new SockJS(this.socketUrl);
        this.stompClient = over (socket);
        this.stompClient.connect({},()=>{
            console.log('connecté au Websocket');

            this.stompClient?.subscribe('/topic/robot-location', (message: Message) => {
                console.log('RFID reçu : ', message.body);
                alert('Le robot a atteint une nouvelle position: ' + message.body);
              });
            });
    }
}