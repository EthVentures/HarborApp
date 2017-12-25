import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-find-family',
  templateUrl: 'find-family.html',
})
export class FindFamilyPage {
  tempimage:any;
  predictions:any;
  constructor(public camera:Camera,public navCtrl: NavController, public navParams: NavParams,public authServiceProvider:AuthServiceProvider) {
    this.tempimage = '';
    this.predictions = [];
  }

  ionViewDidLoad() {

  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getImage(index,item) {
    console.log("index: ",index);
    console.log("item: ",JSON.stringify(item));
    this.authServiceProvider.imageGet(item.details).subscribe(img_get => {
      var img = img_get.response[0].image;
      this.predictions[index]['image'] = 'data:image/jpeg;base64,' + img;
      this.predictions[index]['hasImg'] = true;
    });
  }

  rotateBase64Image(base64data, givenDegrees, callback) {
    console.log("Rotating");
    const degrees = givenDegrees % 360;
    if (degrees % 90 !== 0 || degrees === 0) {
      callback(base64data);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = base64data;
    image.onload = function() {
      if (degrees === 180) {
        canvas.width = image.width;
        canvas.height = image.height;
      } else {
        canvas.width = image.height;
        canvas.height = image.width;
      }
      ctx.rotate(degrees * Math.PI / 180);
      if (degrees === 90) {
        ctx.translate(0, -canvas.width);
      } else if (degrees === 180) {
        ctx.translate(-canvas.width, -canvas.height);
      } else if (degrees === 270) {
        ctx.translate(-canvas.height, 0);
      }
      ctx.drawImage(image, 0, 0);
      callback(canvas.toDataURL());
    };
  }

  findcamera() {
    console.log("Find Family using Camera");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      var data = { 'image': imageData, 'format': 'jpeg' }
      this.authServiceProvider.imageResize(data).subscribe(res_resize => {
        console.log("Image resized/rotating...");
        var reimg = res_resize.response[0].image;
        this.tempimage = 'data:image/jpeg;base64,' + reimg;
        var current_scope = this;
        this.rotateBase64Image(this.tempimage,90,function(rotate_data) {
          current_scope.tempimage = rotate_data;
          var payload = { 'query': rotate_data.split(',')[1] };
          console.log("Finding Family");
          current_scope.authServiceProvider.imageIdentification(payload).subscribe(results => {
            console.log(JSON.stringify(results));
            current_scope.predictions = results.response[0].scores;
            for (var i = 0; i < current_scope.predictions.length; i++) {
              current_scope.getImage(i,current_scope.predictions[i]);
            }
          }, error => {
            console.log("error");
            console.log(JSON.stringify(error));
          });
        })
      });
    }, (err) => {

    });
  }

  finduport() {
    console.log("Find Family using uPort");
    var account = this.authServiceProvider.profile;
    var url = account['avatar'].uri;
    console.log(account['avatar'].uri);
    this.getBase64ImageFromURL(url).subscribe(data => {
      var payload = { 'query': data };
      console.log("Finding Family");
      this.authServiceProvider.imageIdentification(payload).subscribe(results => {
        console.log(JSON.stringify(results));
        this.predictions = results;
        for (var i = 0; i < this.predictions.length; i++) {
          this.getImage(i,this.predictions[i]);
        }
      }, error => {
        console.log("error");
        console.log(JSON.stringify(error));
      });
    });
  }

}
