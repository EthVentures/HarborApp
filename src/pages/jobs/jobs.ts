import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddJobPage } from '../add-job/add-job';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  items:any = []
  constructor(public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.authServiceProvider.jobGet("").subscribe(data => {
      console.log(JSON.stringify(data));
      this.items = data.jobs;
    });
  }

  add() {
    this.navCtrl.push(AddJobPage, { state:'create' });
  }

  update(obj) {
    this.navCtrl.push(AddJobPage, { state:'update', item:obj });
  }
  
}
