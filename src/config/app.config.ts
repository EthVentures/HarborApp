import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class AppConfig {
  public API_URL: string;
  public NO_FAKE_SWITCH:any;

  constructor() {
    this.API_URL = this._readString('API_URL', '');
    this.NO_FAKE_SWITCH = this._readString('NO_FAKE_SWITCH', '');
    this.NO_FAKE_SWITCH = parseInt(this.NO_FAKE_SWITCH);
    console.log(process.env);
  }

  private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
