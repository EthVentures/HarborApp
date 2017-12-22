import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindFamilyPage } from './find-family';

@NgModule({
  declarations: [
    FindFamilyPage,
  ],
  imports: [
    IonicPageModule.forChild(FindFamilyPage),
  ],
})
export class FindFamilyPageModule {}
