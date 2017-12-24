import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTrainingPage } from './add-training';

@NgModule({
  declarations: [
    AddTrainingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTrainingPage),
  ],
})
export class AddTrainingPageModule {}
