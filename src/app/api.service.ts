import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as socketIo from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private socket: Socket, private http: Http) { }

  getMsgHttp() {
    return this.http.get('http://localhost:3000/');
  }

  sendMessage(msg: string) {
    this.socket.emit('send', msg, (err) => { console.log(err); });
  }
  getMessages() {
    return this.socket.fromEvent('allmsg');
  }


}
