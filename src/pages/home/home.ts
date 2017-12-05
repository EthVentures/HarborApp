import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WindowRef } from '../../app/WindowRef';
import { DomSanitizer } from '@angular/platform-browser';
//import { Connect,SimpleSigner } from 'uport-connect';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qr:any;
  uport:any;
  constructor(public _DomSanitizer: DomSanitizer, public navCtrl: NavController,private winRef: WindowRef) {
    this.qr = "";
    var uportconnect = this.winRef.nativeWindow.uportconnect;
    const Connect = uportconnect.ConnectCore;
    const SimpleSigner = uportconnect.SimpleSigner;
    this.uport = new Connect('SafeHarbor', {
         clientId: '2omA1tdB5RZdBxReNmCT2NexPq4cB7GwWRh',
         network: 'rinkeby',
         signer: SimpleSigner('32269c5d23690b5b9f910d2c6323da63e589fc98026d8adb358bc572ca7288ec')
    })
  }

  uportLogin(): Promise<any> {
    var uportconnect = this.winRef.nativeWindow.uportconnect;
    const QRUtil = uportconnect.QRUtil;
    const uriHandler = (uri) => {
      this.qr = QRUtil.getQRDataURI(uri)
    }
    return this.uport.requestCredentials({
      requested: ['name', 'phone', 'country','email','avatar'],
      notifications: true
    }, uriHandler).then(credentials => {
     const address = credentials.address;
     const name = credentials.name;
     console.log(name);
     return [];
    });
  }

  login() {
    this.uportLogin().then(credentials => {
     console.log("firing");
    });
  }

}
