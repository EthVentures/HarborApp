import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
  constructor(public geolocation:Geolocation,public navCtrl: NavController, public navParams: NavParams) {
    this.form = {location:''};
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

}
