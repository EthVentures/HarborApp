import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../config/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

  isLogin:boolean;
  accountType:any;
  profile:any;
  token:any;

  constructor(public http: Http, public storage:Storage, public appConfig:AppConfig) {
    this.isLogin = false;
    this.accountType = '';
    this.profile = '';
    this.token = '';

    storage.get('token').then((token) => {
      if (token != null) {
        this.isLogin = true;
        this.token = token;
      }
    });
    storage.get('profile').then((data) => {
      this.profile = data;
    });
    storage.get('type').then((t) => {
      this.accountType = t;
    });
  }

  getToken(){
    return new Promise<string>((resolve, reject) => {
      this.storage.get('token').then(token=>{
         resolve(token);
      });
    });
  }

  setAuth(status,type) {
    this.accountType = type;
    this.isLogin = status;
  }

  logoff() {
    this.storage.set('token', null);
    this.storage.set('profile', null);
    this.storage.set('type', null);
  }

  setAccount(rawd) {
    console.log(rawd);
    if (rawd != null) {
      var accountdata = rawd['data'];
      if (rawd.type == 'uport') {
        this.storage.set('token', accountdata['token']);
        this.storage.set('profile', accountdata);
        this.storage.set('type', 'uport');
        this.token = accountdata['token'];
        this.profile = accountdata
      } else if (rawd.type == 'provider') {
        this.storage.set('token', accountdata['token']);
        this.storage.set('profile', accountdata);
        this.storage.set('type', 'provider');
        this.token = accountdata['token'];
        this.profile = accountdata
      }
    }
  }
  //http://localhost:5000/api/v1.0/verification
  //http://localhost:5000/api/v1.0/identification
  faceVerification(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://10.0.0.17:5000/api/v1.0/verification", body, { headers : head }).map(res =>  res.json());
  }

  imageResize(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://10.0.0.17:5000/api/v1.0/image/resize", body, { headers : head }).map(res =>  res.json());
  }

  imageAge(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://10.0.0.17:5000/api/v1.0/estimation/age", body, { headers : head }).map(res =>  res.json());
  }

  imageIdentification(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://10.0.0.17:5000/api/v1.0/identification", body, { headers : head }).map(res =>  res.json());
  }

  imageBiometrics(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.appConfig.API_URL + "image/addBiometrics", body, { headers : head }).map(res =>  res.json());
  }

  deleteBiometrics(images) {
    let body = JSON.stringify(images);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.appConfig.API_URL + "image/deleteBiometrics", body, { headers : head }).map(res =>  res.json());
  }

  refugeeCheck() {
    let body = JSON.stringify({'token':this.token, 'refugee':this.profile['publicKey']});
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.appConfig.API_URL + "refugee/refugeeCheck", body, { headers : head }).map(res =>  res.json());
  }

  refugeeSet(images) {
    let body = JSON.stringify({'token':this.token, 'refugee':this.profile,'images':images});
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.appConfig.API_URL + "refugee/refugeeSet", body, { headers : head }).map(res =>  res.json());
  }

  authping(token) {
    let body = JSON.stringify({'token':token});
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.appConfig.API_URL + "user/authping", body, { headers : head }).map(res =>  res.json());
  }

  login(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.appConfig.API_URL + "user/authenticate", body, { headers : head }).map(res =>  res.json());
  }

  register(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.appConfig.API_URL + "user/register", body, { headers : head }).map(res =>  res.json());
  }

}
