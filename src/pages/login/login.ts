import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  unselected:Boolean;
  isuport:Boolean;
  isprovider:Boolean;
  qr:any;
  account:any;
  uport:any;
  isSpinner:boolean;

  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;


  constructor(public _DomSanitizer: DomSanitizer,private socket: Socket, public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.unselected = true;
    this.isuport = false;
    this.isprovider = false;
    this.isSpinner = false;
  }

  token() {
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 50; i++) { key += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return key;
  }

  uportAction() {
    this.unselected = false;
    this.isprovider = false;
    this.isuport = true;
    var keyid = this.token();
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

  provider() {
    this.unselected = false;
    this.isuport = false;
    this.isprovider = true;
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.isSpinner = true;
  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
