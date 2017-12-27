import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddMedPage } from '../add-med/add-med';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  add() {
    this.navCtrl.push(AddMedPage);
  }

  items = [

  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
