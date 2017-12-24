import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddJobPage } from '../add-job/add-job';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  add() {
    this.navCtrl.push(AddJobPage);
  }

  items = [
    'Kitchen Staff',
    'Pharmacy Techician',
    'Cashier',
    'Businesss Systems Analyst',
    'Pet Walker',
    'Office Administrative Assistant'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
