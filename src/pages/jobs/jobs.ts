import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobsPage');
  }

  add() {

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
