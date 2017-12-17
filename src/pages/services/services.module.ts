import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesPage } from './services';

@NgModule({
  declarations: [
    ServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesPage),
  ],
})
export class ServicesPageModule {}
