import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageFmPage } from './manage-fm';

@NgModule({
  declarations: [
    ManageFmPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageFmPage),
  ],
})
export class ManageFmPageModule {}
