import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { WindowRef } from '../../app/WindowRef';
import { DomSanitizer } from '@angular/platform-browser';
import { Socket } from 'ng-socket-io';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qr:any;
  account:any;
  uport:any;
  constructor(public authServiceProvider:AuthServiceProvider,public modalCtrl: ModalController,public _DomSanitizer: DomSanitizer, public navCtrl: NavController,private winRef: WindowRef,/*private socket: Socket*/) {
    this.qr = "";
    this.account = "";
  }

  authAction() {
    let loginModal = this.modalCtrl.create(LoginPage, { });
    /*loginModal.onDidDismiss(obj => {
        console.log(JSON.stringify(obj));
    });*/
    loginModal.present();
  }

  authping() {
    console.log("Auth Ping");
    this.authServiceProvider.getToken().then((token) => {
      this.authServiceProvider.authping(token).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  token() {
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 50; i++) { key += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return key;
  }

  uportAuth() {
    var keyid = this.token();
    console.log("Tempkey: " + keyid);
  /*  this.socket.fromEvent("qr_" + keyid).subscribe(data => {
      this.qr = data['qr'];
      this.account = "";
    });
    this.socket.fromEvent("credentials_" + keyid).subscribe(credentials => {
      console.log("Credentials:", credentials);
      this.account = JSON.stringify(credentials);
      var avatar = credentials["avatar"].uri;
      this.qr = avatar;
    });
    this.socket.emit("uport_auth", { key: keyid });*/

  }

}
