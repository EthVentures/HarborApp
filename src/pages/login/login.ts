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
  creds:any;

  constructor(public socketProvider:SocketProvider,public authServiceProvider:AuthServiceProvider,public _DomSanitizer: DomSanitizer,/*private socket: Socket,*/ public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.unselected = true;
    this.isuport = false;
    this.isprovider = false;
    this.isSpinner = false;
    this.creds = {password:'',username:''};
    this.error = '';
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
      //this.account = JSON.stringify(credentials);
      //var avatar = credentials["avatar"].uri;
      //this.qr = avatar;
      this.authServiceProvider.setAuth(true,'uport');
      this.viewController.dismiss({
        status:true,
        type:'uport',
        data:credentials
      });
    });
    this.socketProvider.sendData("uport_auth", { key: keyid });

  }

  provider() {
    this.unselected = false;
    this.isuport = false;
    this.isprovider = true;
  }

  test() {
    this.authServiceProvider.setAuth(true,'provider');
    this.viewController.dismiss({
      status:true
    });
  }

  login() {
    console.log(this.creds);
    this.isSpinner = true;
    this.authServiceProvider.login(this.creds).subscribe(
      data => {
        if (data.success) {
          console.log(data);
          this.isSpinner = true;
          this.viewController.dismiss({
            status:true,
            type:'provider',
            data:data
          });
          this.authServiceProvider.setAuth(true,'provider');
        } else {

        }
      },
      err => {
        console.log(JSON.stringify(err._body));
        this.error = JSON.parse(err._body).message;
        this.isSpinner = false;
        this.creds['password'] = '';
      },
      () => console.log('Logging in....')
    );
  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
