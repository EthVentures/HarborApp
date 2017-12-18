import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

  isLogin:boolean;
  accountType:any;
  profile:any;
  token:any;

  constructor(public http: Http, public storage:Storage) {
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
    var accountdata = rawd['data'];
    if (rawd.type == 'uport') {
      this.storage.set('token', accountdata['token']);
      this.storage.set('profile', accountdata);
      this.storage.set('type', 'uport');
    } else if (rawd.type == 'provider') {
      this.storage.set('token', accountdata['token']);
      this.storage.set('profile', accountdata);
      this.storage.set('type', 'provider');
    }
  }

  authping(token) {
    let body = JSON.stringify({'token':token});
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://localhost:3000/api/user/authping", body, { headers : head }).map(res =>  res.json());
  }

  login(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://localhost:3000/api/user/authenticate", body, { headers : head }).map(res =>  res.json());
  }

  register(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://localhost:3000/api/user/register", body, { headers : head }).map(res =>  res.json());
  }

}
