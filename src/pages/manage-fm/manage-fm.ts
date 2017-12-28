import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SelectFamilyPage } from '../select-family/select-family';

@IonicPage()
@Component({
  selector: 'page-manage-fm',
  templateUrl: 'manage-fm.html',
})
export class ManageFmPage {

  account:any;
  photos:any;
  constructor(public modalCtrl:ModalController,public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.account = this.authServiceProvider.profile;
    this.photos = [];
    console.log(this.account);
    this.authServiceProvider.familyGet(this.account.publicKey).subscribe(data => {
      console.log(data);
      this.photos = data.members;
      for (var i = 0; i < this.photos.length; i++) {
        this.getImage(i,this.photos[i]);
      }
    });
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
  }

  getImage(index,item) {
    console.log("index: ",index);
    console.log("item: ",JSON.stringify(item));
    var data = {filename:item['_id'] + '.jpeg'};
    this.authServiceProvider.imageGet(data).subscribe(img_get => {
      console.log(img_get);
      var img = img_get.response[0].image;
      this.photos[index]['image'] = 'data:image/jpeg;base64,' + img;
      this.photos[index]['hasImg'] = true;
    });
  }

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

  ionViewDidLoad() {

  }

}
