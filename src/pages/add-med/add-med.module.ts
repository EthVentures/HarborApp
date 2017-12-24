import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMedPage } from './add-med';

@NgModule({
  declarations: [
    AddMedPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMedPage),
  ],
})
export class AddMedPageModule {}
