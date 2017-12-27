import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddJobPage } from '../add-job/add-job';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { JobDetailsPage } from '../job-details/job-details';

@Component({
  selector: 'page-list-jobs',
  templateUrl: 'list-jobs.html',
})
export class ListJobsPage {

  items:any = []
  constructor(public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.authServiceProvider.jobGet("").subscribe(data => {
      console.log(JSON.stringify(data));
      this.items = data.jobs;
    });
  }

  view(item) {
    this.navCtrl.push(JobDetailsPage, { state:'ref', item:item });
  }

}
