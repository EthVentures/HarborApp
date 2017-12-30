import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-find-family',
  templateUrl: 'find-family.html',
})
export class FindFamilyPage {

  tempimage:any;
  predictions:any;
  haveImg = false;
  hasSearch = false;
  rightItemIcon = 'information-circle';
  cardTitle = 'FIND FAMILY';
  isSpinner:boolean;

  constructor(public toastCtrl:ToastController,public actionSheetCtrl: ActionSheetController,public camera:Camera,public navCtrl: NavController, public navParams: NavParams,public authServiceProvider:AuthServiceProvider) {
    this.tempimage = '';
    this.predictions = [];
    this.isSpinner = false;
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

  searchreset() {
    this.haveImg = false;
    this.hasSearch = false;
    this.tempimage = '';
    this.predictions = [];
  }

  docamera(type) {
    console.log("Using Camera");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:type
    }
    this.camera.getPicture(options).then((imageData) => {
      let toast = this.toastCtrl.create({
        message: 'Please wait, processing picture for biometrics...',
        duration: 3000,
        position:'middle'
      });
      toast.present();
      var data = { 'image': imageData, 'format': 'jpeg' }
      this.authServiceProvider.imageResize(data).subscribe(res_resize => {
        console.log("Image resized/rotating...");
        var reimg = res_resize.response[0].image;
        this.tempimage = 'data:image/jpeg;base64,' + reimg;
        var current_scope = this;
        this.rotateBase64Image(this.tempimage,90,function(rotate_data) {
          current_scope.tempimage = rotate_data.split(',')[1];
          current_scope.haveImg = true;
          toast.dismiss();
        })
      });
    }, (err) => {

    });
  }

  findcamera() {
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

  rightAction() {
    if (this.hasSearch) {
      this.haveImg = false;
      this.hasSearch = false;
      this.isSpinner = false;
      this.tempimage = '';
      this.predictions = [];
      this.rightItemIcon = 'information-circle';
      this.cardTitle = 'FIND FAMILY';
    } else {
      // Get Info
    }
  }

  search() {
    if (this.haveImg) {
      this.isSpinner = true;
      console.log("Finding Family");
      var payload = { 'query': this.tempimage };
      this.authServiceProvider.imageIdentification(payload).subscribe(results => {
        console.log(results);
        this.predictions = results;
        this.hasSearch = true;
        this.rightItemIcon = 'refresh-circle';
        this.cardTitle = 'RESULTS';
        this.isSpinner = false;

        for (var i = 0; i < this.predictions.length; i++) {
          this.getImage(i,this.predictions[i]);
        }
      }, error => {
        console.log("error");
        console.log(JSON.stringify(error));
      });
    }

  }

  retake() {
    this.haveImg = false;
    this.tempimage = '';
  }

  finduport() {
    console.log("Using uPort");
    var account = this.authServiceProvider.profile;
    var url = account['avatar'].uri;
    console.log(account['avatar'].uri);
    this.getBase64ImageFromURL(url).subscribe(data => {
      this.tempimage = data;
      this.haveImg = true;
    });
  }

}
