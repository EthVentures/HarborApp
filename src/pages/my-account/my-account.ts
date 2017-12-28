import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ManageFmPage } from '../manage-fm/manage-fm';

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  name:any;
  account:any;
  image:any;

  constructor(public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.name = "";
    var account = this.authServiceProvider.profile;
    console.log(account);
    this.name = account.name;
    this.account = account;
    this.image = account.avatar['uri'];
  }

  ionViewDidLoad() {

  }

  manage() {
    this.navCtrl.push(ManageFmPage);
  }

}
