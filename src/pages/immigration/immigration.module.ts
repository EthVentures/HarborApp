import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmigrationPage } from './immigration';

@NgModule({
  declarations: [
    ImmigrationPage,
  ],
  imports: [
    IonicPageModule.forChild(ImmigrationPage),
  ],
})
export class ImmigrationPageModule {}
