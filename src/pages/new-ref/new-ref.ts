import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-new-ref',
  templateUrl: 'new-ref.html',
})
export class NewRefPage {


  data:any;

  constructor(public viewController:ViewController,public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.data = JSON.stringify(this.authServiceProvider.profile);
  }

  ionViewDidLoad() {

  }

  test() {
    this.authServiceProvider.refugeeSet().subscribe(data => {
      this.viewController.dismiss({
        status:true
      });
    });
  }

}
