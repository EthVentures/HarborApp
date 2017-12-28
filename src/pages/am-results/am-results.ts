import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-am-results',
  templateUrl: 'am-results.html',
})
export class AmResultsPage {

  account:any;
  photos:any;
  constructor(public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.photos = this.navParams.get("results");
    console.log(JSON.stringify(this.photos));
    for (var i = 0; i < this.photos.length; i++) {
      this.getImage(i,this.photos[i]);
    }
  }

  ionViewDidLoad() {
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

}
