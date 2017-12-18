import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  regs = {}
  payload:any;
  isSpinner:boolean;
  error:any;

  constructor(public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.payload = {}
    this.isSpinner = false;
    this.error = '';
  }

  ionViewDidLoad() {

  }

  register() {
    this.isSpinner = true;
  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
