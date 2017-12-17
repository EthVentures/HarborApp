import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SocketProvider } from '../../providers/socket/socket';

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

  constructor(public socketProvider:SocketProvider,public authServiceProvider:AuthServiceProvider,public _DomSanitizer: DomSanitizer,/*private socket: Socket,*/ public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams) {
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

    this.socketProvider.getEvent("qr_" + keyid).subscribe(data => {
      this.qr = data['qr'];
      this.account = "";
    });
    this.socketProvider.getEvent("credentials_" + keyid).subscribe(credentials => {
      console.log("Credentials:", credentials);
      this.account = JSON.stringify(credentials);
      var avatar = credentials["avatar"].uri;
      this.qr = avatar;
    });
    this.socketProvider.sendData("uport_auth", { key: keyid });

    /*this.authServiceProvider.setAuth(true,'uport');
    this.viewController.dismiss({
      status:true
    });*/
  }

  provider() {
    this.unselected = false;
    this.isuport = false;
    this.isprovider = true;
  }

  test() {
    this.authServiceProvider.setAuth(true,'uport');
    this.viewController.dismiss({
      status:true
    });
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.isSpinner = true;
    var self = this;
    setTimeout(function() {
      self.isSpinner = false;
      self.authServiceProvider.setAuth(true,'provder');
      self.viewController.dismiss({
        status:true
      });
    },1000);
  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
