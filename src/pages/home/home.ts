import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WindowRef } from '../../app/WindowRef';
import { DomSanitizer } from '@angular/platform-browser';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qr:any;
  account:any;
  uport:any;
  constructor(public _DomSanitizer: DomSanitizer, public navCtrl: NavController,private winRef: WindowRef,private socket: Socket) {
    this.qr = "";
    this.account = "";
  }

  keyid() {
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 50; i++) { key += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return key;
  }

  uportAuth() {
    var keyid = this.keyid();
    console.log("Tempkey: " + keyid);
    this.socket.fromEvent("qr_" + keyid).subscribe(data => {
      this.qr = data['qr'];
      this.account = "";
    });
    this.socket.fromEvent("credentials_" + keyid).subscribe(credentials => {
      console.log("Credentials:", credentials);
      this.account = JSON.stringify(credentials);
      var avatar = credentials["avatar"].uri;
      this.qr = avatar;
    });
    this.socket.emit("uport_auth", { key: keyid });

  }

}
