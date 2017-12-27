import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-select-family',
  templateUrl: 'select-family.html',
})
export class SelectFamilyPage {

  famImage:any;
  firstName:any;
  lastName:any;
  age:any;
  location:any;
  notes:any;
  temp:any;
  relationship:any;
  missing:any;
  constructor(public toastCtrl: ToastController,public authServiceProvider:AuthServiceProvider,private camera: Camera,public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.famImage = '';
    this.firstName = '';
    this.lastName = '';
    this.age = '';
    this.location = '';
    this.notes = '';
    this.temp = {};
    this.relationship = '';
    this.missing = false;
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

  rotate() {

  }

  saveImageTest() {
    console.log("saveImageTest");

    var image = this.famImage.split(',')[1];
    var data = {
      image:image,
      publicKey: this.authServiceProvider.profile['publicKey'],
      publicEncKey: this.authServiceProvider.profile['publicEncKey'],
      firstName:this.firstName,
      lastName:this.lastName,
      age:this.age,
      notes:this.notes,
      location:this.location,
      missing:this.missing,
      user: {
        type:'uport'
      },
    };

    this.authServiceProvider.imageBiometrics(data).subscribe(response => {
      console.log(JSON.stringify(response));
      this.temp = response;
    });
  }
  deleteImageTest() {
    this.authServiceProvider.deleteBiometrics(this.temp).subscribe(response => {
      console.log(JSON.stringify(response));
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

  cam() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let toast = this.toastCtrl.create({
        message: 'Please wait, processing picture for biometrics...',
        duration: 3000,
        position:'middle'
      });
      toast.present();
      var data = { 'image': imageData, 'format': 'jpeg' }
      this.authServiceProvider.imageResize(data).subscribe(datare => {
        this.famImage = 'data:image/jpeg;base64,' + datare.response[0].image;
        var self = this;
        this.rotateBase64Image(this.famImage,90,function(data) {
          self.famImage = data;
          toast.dismiss();
          /*var ageq = {'query':datare.response[0].image};
          self.authServiceProvider.imageAge(ageq).subscribe(data_age => {
            console.log(JSON.stringify(data_age));
            self.famImage = data;
            toast.dismiss();
          });*/
        })
      });
    }, (err) => {

    });
  }

  add() {
    console.log(this.relationship);
    var image = this.famImage.split(',')[1];
    var data = {
      image:image,
      publicKey: this.authServiceProvider.profile['publicKey'],
      publicEncKey: this.authServiceProvider.profile['publicEncKey'],
      firstName:this.firstName,
      lastName:this.lastName,
      age:this.age,
      notes:this.notes,
      location:this.location,
      relationship:this.relationship,
      user: {
        type:'uport'
      },
    };
    this.authServiceProvider.imageBiometrics(data).subscribe(response => {
      console.log(JSON.stringify(response));
      this.temp = response;
      this.temp["image"] = this.famImage;
      this.viewController.dismiss({status:true,data:this.temp});
    });
  }

}
