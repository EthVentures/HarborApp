import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceProvider {

  isLogin:boolean;
  accountType:any;

  constructor(public http: Http) {
    this.isLogin = false;
    this.accountType = '';
  }

  setAuth(status,type) {
    this.accountType = type;
    this.isLogin = status;
  }

}
