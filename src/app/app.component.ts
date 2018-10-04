import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { Socket } from 'ngx-socket-io';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-app';

  @ViewChild('content') content;

  chats;
  user = null;
  msg;
  log = console.log;

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.apiService.getMsgHttp().subscribe(res => {
      console.log(res);
    });
    this.apiService.getMessages().subscribe(data => {
      this.chats = data;
      console.log(this.chats);
    });
    // this.open();
    if (localStorage.getItem('name')) {
      this.user = localStorage.getItem('name');
    }
  }
  saveUser(username) {
    this.user = username;
    localStorage.setItem('name', username);
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }
  sendMsg(msg) {

    console.log(msg)
    this.apiService.sendMessage(`{"message":"${msg}", "user":"${localStorage.getItem('name')}"}`);
  }
}
