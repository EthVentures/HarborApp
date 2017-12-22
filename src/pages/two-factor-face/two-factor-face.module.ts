import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwoFactorFacePage } from './two-factor-face';

@NgModule({
  declarations: [
    TwoFactorFacePage,
  ],
  imports: [
    IonicPageModule.forChild(TwoFactorFacePage),
  ],
})
export class TwoFactorFacePageModule {}
