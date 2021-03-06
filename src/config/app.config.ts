import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class AppConfig {
  public API_URL: string;
  public BM_API_URL: string;
  public NO_FAKE_SWITCH:any;
  public FACEVERIFICTIONLIMIT:any;

  constructor() {
    this.API_URL = this._readString('API_URL', 'http://192.168.50.52:3000/api/');
    this.BM_API_URL = this._readString('BM_API_URL', 'http://192.168.50.52:5000/');
    this.NO_FAKE_SWITCH = this._readString('NO_FAKE_SWITCH', '');
    this.NO_FAKE_SWITCH = parseInt(this.NO_FAKE_SWITCH);
    this.FACEVERIFICTIONLIMIT = 0.9;
    console.log(process.env);
  }

  private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
