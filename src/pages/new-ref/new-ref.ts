import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { SelectFamilyPage } from '../select-family/select-family';

@IonicPage()
@Component({
  selector: 'page-new-ref',
  templateUrl: 'new-ref.html',
})
export class NewRefPage {


  data:any;
  photos:any;
  constructor(public modalCtrl:ModalController,public viewController:ViewController,public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.data = JSON.stringify(this.authServiceProvider.profile);
    this.photos = [];
    //console.log(this.data);
  }

  ionViewDidLoad() {

  }
  /*
  <ion-option value="1">Brother</ion-option>
  <ion-option value="2">Sister</ion-option>
  <ion-option value="3">Parent</ion-option>
  <ion-option value="4">Grandmother</ion-option>
  <ion-option value="5">Grandfather</ion-option>
  <ion-option value="6">First Cousin</ion-option>
  <ion-option value="7">Second Cousin</ion-option>
  <ion-option value="8">Son</ion-option>
  <ion-option value="9">Daughter</ion-option>
  <ion-option value="10">Wife</ion-option>
  */
  relationship(index) {
    var i = parseInt(index);
    if (i == 1) { return 'Brother'; }
    if (i == 2) { return 'Sister'; }
    if (i == 3) { return 'Parent'; }
    if (i == 4) { return 'Grandmother'; }
    if (i == 5) { return 'Grandfather'; }
    if (i == 6) { return 'First Cousin'; }
    if (i == 7) { return 'Second Cousin'; }
    if (i == 8) { return 'Son'; }
    if (i == 9) { return 'Daughter'; }
    if (i == 10) { return 'Wife'; }
    if (i == 11) { return 'Husband'; }
    return 'Other';
  }

  deleteAtIndex(i,item) {
    this.authServiceProvider.deleteBiometrics(item).subscribe(response => {
      this.photos.splice(i, 1);
      console.log(JSON.stringify(response));
    });
  }

  add() {

    let select = this.modalCtrl.create(SelectFamilyPage, { });
    select.onDidDismiss(obj => {
      if (obj.status) {
        var famPerson = obj['data'];
        this.photos.push(famPerson);
      }
    });
    select.present();
    //console.log(JSON.stringify(this.authServiceProvider.profile));
  }

  link() {
    var images = [];
    for (var i = 0; i < this.photos.length; i++) {
      images.push(this.photos[i]['_id']);
    }
    this.authServiceProvider.refugeeSet(images).subscribe(data => {
      console.log(JSON.stringify(data));
      this.authServiceProvider.setID(data.refugee['_id']);
      this.viewController.dismiss({
        status:true
      });
    });
  }

}
