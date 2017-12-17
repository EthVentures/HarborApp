import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { JobsPage } from '../pages/jobs/jobs';
import { ImmigrationPage } from '../pages/immigration/immigration';
import { ServicesPage } from '../pages/services/services';
import { EducationPage } from '../pages/education/education';
import { TrainingPage } from '../pages/training/training';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = JobsPage;

  pages: Array<{title: string, icon:string, component: any}>;
  uportpages: Array<{title: string, icon:string, component: any}>;
  providerpages: Array<{title: string, icon:string, component: any}>;

  constructor(public modalCtrl: ModalController,public authServiceProvider:AuthServiceProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', icon:'home', component: HomePage }
    ];

    this.uportpages = [
      { title: 'Uport', icon:'desktop',component: HomePage }
    ];

    this.providerpages = [
      { title: 'Job Management', icon:'hammer',component: JobsPage },
      { title: 'Med Services', icon:'pulse',component: ServicesPage },
      { title: 'Immigration Apps', icon:'body',component: ImmigrationPage },
      { title: 'Training', icon:'hand',component: TrainingPage },
      { title: 'Education', icon:'book',component: EducationPage }
    ];

  }

  login() {
    let loginModal = this.modalCtrl.create(LoginPage, { });
    loginModal.onDidDismiss(obj => {
        console.log(JSON.stringify(obj));
    });
    loginModal.present();
  }

  register() {}
  about() {}

  account(item) {
    if (this.authServiceProvider.accountType == item) {
      return true;
    } else {
      return false;
    }
  }

  logoff() {
    this.authServiceProvider.setAuth(false,'');
    this.nav.setRoot(HomePage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
