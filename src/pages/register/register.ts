import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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

  constructor(public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams,public authServiceProvider:AuthServiceProvider) {
    this.payload = {}
    this.isSpinner = false;
    this.error = '';
  }

  ionViewDidLoad() {

  }

  register() {
    this.isSpinner = true;
    this.authServiceProvider.register(this.payload).subscribe(
      data => {
        if (data.success) {
          console.log(data);
          this.isSpinner = false;
          this.viewController.dismiss({status:true,creds:this.payload});
        } else {

        }
      },
      err => {
        console.log(JSON.stringify(err._body));
        this.error = JSON.parse(err._body).message;
        this.isSpinner = false;
      },
      () => console.log('Register')
    );
  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
