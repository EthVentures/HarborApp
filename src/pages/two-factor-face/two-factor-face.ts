import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from 'ionic-angular';
import { AppConfig } from '../../config/app.config';

@Component({
  selector: 'page-two-factor-face',
  templateUrl: 'two-factor-face.html',
})
export class TwoFactorFacePage {

  tempimage:any;
  constructor(public appConfig:AppConfig,public toastController:ToastController,public _DomSanitizer:DomSanitizer,public authServiceProvider:AuthServiceProvider,private camera: Camera,public navCtrl: NavController, public navParams: NavParams) {
    this.tempimage = '';
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

  processResult(results) {
    var score = results.response[0].score;
    console.log("TFA Score: ", score);
    if (score > this.appConfig.FACEVERIFICTIONLIMIT) {
      let toast = this.toastController.create({
        message: 'Two-Face Authentication Successfull!',
        duration: 2000,
        position:'middle'
      });
      toast.present();
    } else {
      let toast = this.toastController.create({
        message: 'Two-Face Authentication Failed!',
        duration: 2000,
        position:'middle'
      });
      toast.present();
    }
  }

  scan() {

    console.log("Scanning...");

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let toast = this.toastController.create({
        message: 'Please wait, processing picture for biometrics...',
        position:'middle'
      });
      toast.present();
      console.log("Got picture!");
      var data = { 'image': imageData, 'format': 'jpeg' }

      this.authServiceProvider.imageResize(data).subscribe(res_resize => {

        console.log("Image resized!");

        var reimg = res_resize.response[0].image;
        this.tempimage = 'data:image/jpeg;base64,' + reimg;
        var current_scope = this;

        this.rotateBase64Image(this.tempimage,90,function(rotate_data) {

          current_scope.tempimage = rotate_data;
          var account = current_scope.authServiceProvider.profile;
          var url = account['avatar'].uri;
          console.log("Getting uPort image");
          console.log(account['avatar'].uri);

          current_scope.getBase64ImageFromURL(url).subscribe(url_data => {

            console.log("Got uPort image");
            var rotate_without_tags = current_scope.tempimage.split(",")[1];
            var payload = { 'query': rotate_without_tags, 'target': url_data };
            console.log("Comparing");

            current_scope.authServiceProvider.faceVerification(payload).subscribe(results => {
              toast.dismiss();
              current_scope.processResult(results);
            }, error => {
              console.log("error");
              console.log(JSON.stringify(error));
            });


          });

        })

      });
    }, (err) => {

    });
  }

}
