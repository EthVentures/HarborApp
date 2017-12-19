import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRefPage } from './new-ref';

@NgModule({
  declarations: [
    NewRefPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRefPage),
  ],
})
export class NewRefPageModule {}
