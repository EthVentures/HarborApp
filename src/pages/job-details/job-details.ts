import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
})
export class JobDetailsPage {

  item:any;
  applyEnabled = false;
  state:any;

  constructor(public toastController:ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
    console.log(this.item);
    this.state = this.navParams.get('state');
    if (this.state == 'ref') {
      this.applyEnabled = true;
    }
  }

  ionViewDidLoad() {

  }

  apply() {
    let toast = this.toastController.create({
      message: 'Successfully applied for the job!',
      duration: 2000,
      position:'middle'
    });
    toast.present();
    this.navCtrl.pop();
  }

}
