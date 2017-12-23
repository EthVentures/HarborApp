import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnonymousSearchPage } from './anonymous-search';

@NgModule({
  declarations: [
    AnonymousSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AnonymousSearchPage),
  ],
})
export class AnonymousSearchPageModule {}
