import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  add() {

  }

  items = [
    'Kitchen Staff'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
