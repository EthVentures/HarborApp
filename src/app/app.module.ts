import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WindowRef } from './WindowRef';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SocketProvider } from '../providers/socket/socket';

const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {reconnect: true} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WindowRef,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SocketProvider
  ]
})
export class AppModule {}
