import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketProvider {

  constructor(private socket: Socket) { }

  getEvent(name) { return this.socket.fromEvent(name); }

  sendData(event,data) { this.socket.emit(event, data); }

}
