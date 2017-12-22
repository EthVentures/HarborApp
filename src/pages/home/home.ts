import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { WindowRef } from '../../app/WindowRef';
import { DomSanitizer } from '@angular/platform-browser';
import { Socket } from 'ng-socket-io';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Camera, ImageResizer]
})
export class HomePage {

  qr: any;
  account: any;
  uport: any;
  baseimage: any;
  temptext: any;
  raw: any;
  lastImage: string = null;
  constructor(private imageResizer: ImageResizer, public platform: Platform, private transfer: Transfer, private file: File, private filePath: FilePath, private camera: Camera, public authServiceProvider: AuthServiceProvider, public modalCtrl: ModalController, public _DomSanitizer: DomSanitizer, public navCtrl: NavController, private winRef: WindowRef,/*private socket: Socket*/) {
    this.qr = "";
    this.account = "";
    this.baseimage = "";
    this.temptext = "";
    this.raw = "";
  }

  authAction() {
    let loginModal = this.modalCtrl.create(LoginPage, {});
    /*loginModal.onDidDismiss(obj => {
        console.log(JSON.stringify(obj));
    });*/
    loginModal.present();
  }

  authping() {
    console.log("Auth Ping");
    this.authServiceProvider.getToken().then((token) => {
      this.authServiceProvider.authping(token).subscribe(
        data => {
          console.log(JSON.stringify(data));
          this.temptext = JSON.stringify(data);
        },
        err => {
          console.log(JSON.stringify(err));
        }
      );
    });
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

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".txt";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log(JSON.stringify(success));
    }, error => {
      console.log('Error while storing file.');
    });
  }


  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }



  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log('Error while selecting image.');
    });
  }

  rotateBase64Image(base64data, givenDegrees, callback) {
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


  testRotate() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      var data = { 'image': imageData, 'format': 'jpeg' }
      this.baseimage = 'data:image/jpeg;base64,' + imageData;
      this.authServiceProvider.imageResize(data).subscribe(datare => {
        //console.log(datare.response[0].image);
        this.baseimage = 'data:image/jpeg;base64,' + datare.response[0].image;
        var self = this;
        this.rotateBase64Image(this.baseimage,90,function(data) {
          //console.log(data);
          self.baseimage = data;
        })
      });
    }, (err) => {

    });
  }

  ver() {
    var account = this.authServiceProvider.profile;
    var url = account['avatar'].uri;
    console.log(account['avatar'].uri);

    this.getBase64ImageFromURL(url).subscribe(data => {
      //this.baseimage = 'data:image/jpeg;base64,' + data;
      //console.log(this.baseimage);
      var img = this.baseimage.split(",");
      var payload = { 'query': img[1], 'target': data };
      //console.log(JSON.stringify(payload));
      console.log("Comparing");
      this.authServiceProvider.faceVerification(payload).subscribe(data => {
        console.log(JSON.stringify(data));
        this.temptext = JSON.stringify(data);
      }, error => {
        console.log("error");
        console.log(JSON.stringify(error));
      });
    });

  }


  save() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }

  resize() {
    console.log("resize");
    var filePath = cordova.file.dataDirectory;
    //{'image':b64encode(query),'format':'jpeg'}
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      var data = { 'image': imageData, 'format': 'jpeg' }
      this.baseimage = 'data:image/jpeg;base64,' + imageData;
      this.authServiceProvider.imageResize(data).subscribe(datare => {
        console.log(datare.response[0].image);
        this.baseimage = 'data:image/jpeg;base64,' + datare.response[0].image;

        var account = this.authServiceProvider.profile;
        var url = account['avatar'].uri;
        console.log(account['avatar'].uri);

        this.getBase64ImageFromURL(url).subscribe(data => {
          //this.baseimage = 'data:image/jpeg;base64,' + data;
          var payload = { 'query': datare.response[0].image, 'target': data };
          //console.log(JSON.stringify(payload));
          console.log("Comparing");
          this.authServiceProvider.faceVerification(payload).subscribe(data => {
            console.log(JSON.stringify(data));
            this.temptext = JSON.stringify(data);
          }, error => {
            console.log("error");
            console.log(JSON.stringify(error));
          });
        });

      });
    }, (err) => {

    });
  }

  compare() {
    var account = this.authServiceProvider.profile;
    var url = account['avatar'].uri;
    console.log(account['avatar'].uri);

    this.getBase64ImageFromURL(url).subscribe(data => {
      this.baseimage = 'data:image/jpeg;base64,' + data;
      var payload = { 'query': data, 'target': data };
      //console.log(JSON.stringify(payload));
      console.log("Comparing");
      this.authServiceProvider.faceVerification(payload).subscribe(data => {
        console.log(JSON.stringify(data));
        this.temptext = JSON.stringify(data);
      }, error => {
        console.log("error");
        console.log(JSON.stringify(error));
      });
    });
  }

  cam() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.baseimage = 'data:image/jpeg;base64,' + imageData;
      var account = this.authServiceProvider.profile;
      var url = account['avatar'].uri;
      console.log(account['avatar'].uri);
      //console.log(imageData);
      //console.log(imageData);
      /*this.getBase64ImageFromURL(url).subscribe(data => {
        //this.baseimage = 'data:image/jpeg;base64,' + data;
        //var payload = {'query':imageData,'target':data};
        //console.log(JSON.stringify(payload));
        console.log("Comparing");
        this.authServiceProvider.faceVerification(payload).subscribe(data => {
          console.log(JSON.stringify(data));
          this.temptext = JSON.stringify(data);
        },error => {
          console.log("error");
          console.log(JSON.stringify(error));
        });
      });*/
    }, (err) => {

    });

  }

  token() {
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 50; i++) { key += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return key;
  }

  uportAuth() {
    var keyid = this.token();
    console.log("Tempkey: " + keyid);
    /*  this.socket.fromEvent("qr_" + keyid).subscribe(data => {
        this.qr = data['qr'];
        this.account = "";
      });
      this.socket.fromEvent("credentials_" + keyid).subscribe(credentials => {
        console.log("Credentials:", credentials);
        this.account = JSON.stringify(credentials);
        var avatar = credentials["avatar"].uri;
        this.qr = avatar;
      });
      this.socket.emit("uport_auth", { key: keyid });*/

  }

}
