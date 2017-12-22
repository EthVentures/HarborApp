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
  }

  ionViewDidLoad() {

  }

  deleteAtIndex(i) {
    this.photos.splice(i, 1);
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

  test() {
    this.authServiceProvider.refugeeSet().subscribe(data => {
      this.viewController.dismiss({
        status:true
      });
    });
  }

}
