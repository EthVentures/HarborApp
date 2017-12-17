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

import { JobsPage } from '../pages/jobs/jobs';
import { ImmigrationPage } from '../pages/immigration/immigration';
import { ServicesPage } from '../pages/services/services';
import { EducationPage } from '../pages/education/education';
import { TrainingPage } from '../pages/training/training';

const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {reconnect: true} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    JobsPage,
    ImmigrationPage,
    ServicesPage,
    EducationPage,
    TrainingPage
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
    LoginPage,
    JobsPage,
    ImmigrationPage,
    ServicesPage,
    EducationPage,
    TrainingPage
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
