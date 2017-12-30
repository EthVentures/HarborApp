import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ListJobsPage } from '../list-jobs/list-jobs';
import { AmResultsPage } from '../am-results/am-results';

@Component({
  selector: 'page-anonymous-search',
  templateUrl: 'anonymous-search.html',
})
export class AnonymousSearchPage {

  tempimage:any;
  predictions:any;
  haveImg = false;
  hasSearch = false;
  isSpinner:boolean;

  constructor(public actionSheetCtrl: ActionSheetController,public toastCtrl:ToastController,public _DomSanitizer:DomSanitizer,public authServiceProvider:AuthServiceProvider,private camera: Camera,public navCtrl: NavController, public navParams: NavParams) {
    this.tempimage = '';
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

  retake() {
    this.tempimage = '';
    this.haveImg = false;
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

  ionViewDidLoad() {

  }

  job() {
    this.navCtrl.push(ListJobsPage);
  }

  docamera(type) {
    console.log("Find Family using Camera");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:type
    }
    let toast = this.toastCtrl.create({
      message: 'Please wait, processing picture for biometrics...',
      position:'middle'
    });
    this.camera.getPicture(options).then((imageData) => {
      toast.present();
      var data = { 'image': imageData, 'format': 'jpeg' }
      this.authServiceProvider.imageResize(data).subscribe(res_resize => {
        console.log("Image resized/rotating...");
        var reimg = res_resize.response[0].image;
        var current_scope = this;
        this.rotateBase64Image('data:image/jpeg;base64,' + reimg,90,function(rotate_data) {
          current_scope.tempimage = rotate_data;
          current_scope.haveImg = true;
          toast.dismiss();
        })
      });
    }, (err) => {

    });
  }

  anonymouscamera() {
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Please select your method',
     buttons: [
       {
         text: 'Camera',
         handler: () => {
           this.docamera(1);
         }
       },
       {
         text: 'Gallery',
         handler: () => {
           this.docamera(0);
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => { }
       }
     ]
   });
   actionSheet.present();
  }



  find() {
    if (this.haveImg) {
      this.isSpinner = true;
      console.log("Finding Family");
      var payload = { 'query': this.tempimage.split(',')[1] };
      this.authServiceProvider.imageIdentification(payload).subscribe(results => {
        console.log(JSON.stringify(results));
        this.isSpinner = false;
        this.predictions = results;
        this.hasSearch = true;
        this.retake();
        this.navCtrl.push(AmResultsPage, {results:results});
      }, error => {
        console.log("error");
        console.log(JSON.stringify(error));
      });
    }
  }

}
