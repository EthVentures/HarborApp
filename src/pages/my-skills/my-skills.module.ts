import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySkillsPage } from './my-skills';

@NgModule({
  declarations: [
    MySkillsPage,
  ],
  imports: [
    IonicPageModule.forChild(MySkillsPage),
  ],
})
export class MySkillsPageModule {}
