import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingPage } from './training';

@NgModule({
  declarations: [
    TrainingPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingPage),
  ],
})
export class TrainingPageModule {}
