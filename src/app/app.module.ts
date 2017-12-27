import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WindowRef } from './WindowRef';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SocketProvider } from '../providers/socket/socket';
import { FindFamilyPage } from '../pages/find-family/find-family';
import { JobsPage } from '../pages/jobs/jobs';
import { ImmigrationPage } from '../pages/immigration/immigration';
import { ServicesPage } from '../pages/services/services';
import { EducationPage } from '../pages/education/education';
import { TrainingPage } from '../pages/training/training';
import { NewRefPage } from '../pages/new-ref/new-ref';
import { SelectFamilyPage } from '../pages/select-family/select-family';
import { TwoFactorFacePage } from '../pages/two-factor-face/two-factor-face';
import { AboutPage } from '../pages/about/about';
import { IonicStorageModule } from '@ionic/storage';
import { MyResourcesPage } from '../pages/my-resources/my-resources';
import { AnonymousSearchPage } from '../pages/anonymous-search/anonymous-search';
import { AddJobPage } from '../pages/add-job/add-job';
import { AddMedPage } from '../pages/add-med/add-med';
import { AddTrainingPage } from '../pages/add-training/add-training';
import { AddEdPage } from '../pages/add-ed/add-ed';
import { RStatusPage } from '../pages/r-status/r-status';
import { AppConfig } from '../config/app.config';
import { AgmCoreModule } from '@agm/core';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ListJobsPage } from '../pages/list-jobs/list-jobs';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { MySkillsPage } from '../pages/my-skills/my-skills';
import { AddSkillPage } from '../pages/add-skill/add-skill';

const config: SocketIoConfig = { url: 'http://192.168.50.52:3000/', options: {reconnect: true} };

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
    TrainingPage,
    RegisterPage,
    NewRefPage,
    SelectFamilyPage,
    TwoFactorFacePage,
    AboutPage,
    FindFamilyPage,
    MyResourcesPage,
    AnonymousSearchPage,
    AddJobPage,
    AddMedPage,
    AddTrainingPage,
    AddEdPage,
    RStatusPage,
    ListJobsPage,
    JobDetailsPage,
    MySkillsPage,
    AddSkillPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKMrOSfV-68R4r8IrQQ_o-NzXnDOg9zyo',
      libraries: ['places']
    })
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
    TrainingPage,
    RegisterPage,
    NewRefPage,
    SelectFamilyPage,
    TwoFactorFacePage,
    AboutPage,
    FindFamilyPage,
    MyResourcesPage,
    AnonymousSearchPage,
    AddJobPage,
    AddMedPage,
    AddTrainingPage,
    AddEdPage,
    RStatusPage,
    ListJobsPage,
    JobDetailsPage,
    MySkillsPage,
    AddSkillPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WindowRef,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SocketProvider,
    AppConfig,
    File,
    Transfer,
    Camera,
    FilePath,
  ]
})
export class AppModule {}
