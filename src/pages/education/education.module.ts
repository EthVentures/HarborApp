import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EducationPage } from './education';

@NgModule({
  declarations: [
    EducationPage,
  ],
  imports: [
    IonicPageModule.forChild(EducationPage),
  ],
})
export class EducationPageModule {}
