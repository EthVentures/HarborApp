import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

declare var google: any;

@Component({
  selector: 'page-add-job',
  templateUrl: 'add-job.html',
  providers:[Geolocation]
})
export class AddJobPage {

  form:any;
  lat: number = 40.749421;
  lng: number = -73.967499;
  zoom: number = 12;
  submitTitle = "";
  title = "";
  updating = false;

  constructor(public geolocation:Geolocation,
              public navCtrl: NavController,
              public navParams: NavParams,
              public authServiceProvider:AuthServiceProvider) {

    this.form = {
      title:'',
      location:'',
      hourly:'',
      description:'',
      jobr:'',
      name:'',
      position:'',
      phone:'',
      fax:'',
      email:''
    };
    var state = this.navParams.get('state');
    if (state == 'create') {
      this.submitTitle = "Post Job";
      this.title = "Post Job";
      this.updating = false;
    }
    if (state == 'update') {
      this.updating = true;
      this.title = "Update Job";
      this.submitTitle = "Update Job";
      this.form = this.navParams.get("item");
    }

  }

  ionViewDidLoad() {

  }

  location() {
    console.log("Getting Location...");
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log(JSON.stringify(resp));
      var coords = resp['coords'];
      this.lat = coords.latitude;
      this.lng = coords.longitude;

      var latlng = {lat: this.lat, lng: this.lng };
      var geocoder = new google.maps.Geocoder;
      var self = this;

      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          console.log(results);
          self.form.location = results[0].formatted_address;
        } else {

        }
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  delete() {
    this.authServiceProvider.jobDelete(this.form['_id']).subscribe(data => {
      this.navCtrl.pop();
    });
  }

  create() {
    if (this.updating) {
      this.authServiceProvider.jobUpdate(this.form).subscribe(data => {
        this.navCtrl.pop();
      });
    } else {
      this.authServiceProvider.jobCreate(this.form).subscribe(data => {
        this.navCtrl.pop();
      });
    }
  }

}
