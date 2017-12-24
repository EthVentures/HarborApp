import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddTrainingPage } from '../add-training/add-training';

@IonicPage()
@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  add() {
    this.navCtrl.push(AddTrainingPage);
  }

  items = [
    'Kitchen Staff',
    'Pharmacy Techician',
    'Cashier',
    'Businesss Systems Analyst',
    'Pet Walker',
    'Office Administrative Assistant'
  ];


}
