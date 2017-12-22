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
import { RegisterPage } from '../pages/register/register';
import { NewRefPage } from '../pages/new-ref/new-ref';
import { AppConfig } from '../config/app.config';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';

import { TwoFactorFacePage } from '../pages/two-factor-face/two-factor-face';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TwoFactorFacePage;
  //rootPage: any = HomePage;

  pages: Array<{title: string, icon:string, component: any}>;
  uportpages: Array<{title: string, icon:string, component: any}>;
  providerpages: Array<{title: string, icon:string, component: any}>;

  constructor(public appConfig:AppConfig,public modalCtrl: ModalController,public authServiceProvider:AuthServiceProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', icon:'home', component: HomePage }
    ];

    this.uportpages = [
      { title: 'Home', icon:'home', component: HomePage },
      { title: 'Uport', icon:'desktop',component: HomePage }
    ];

    this.providerpages = [
      { title: 'Home', icon:'home', component: HomePage },
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
        this.authServiceProvider.setAccount(obj);
        if (obj != null) {
          if (obj.type == 'uport') {
            this.authServiceProvider.refugeeCheck().subscribe(data => {
              console.log(JSON.stringify(data));
              if (!data.found) {
                let nfModal = this.modalCtrl.create(NewRefPage, { });
                nfModal.onDidDismiss(obj => {

                });
                nfModal.present();
              }
            });
          }
        }
    });
    loginModal.present();
  }

  register() {
    let registerModal = this.modalCtrl.create(RegisterPage, { });
    registerModal.onDidDismiss(obj => { });
    registerModal.present();
  }
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
    this.authServiceProvider.logoff();
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
