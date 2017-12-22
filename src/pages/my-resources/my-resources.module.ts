import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyResourcesPage } from './my-resources';

@NgModule({
  declarations: [
    MyResourcesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyResourcesPage),
  ],
})
export class MyResourcesPageModule {}
