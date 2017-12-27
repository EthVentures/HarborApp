import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSkillPage } from './add-skill';

@NgModule({
  declarations: [
    AddSkillPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSkillPage),
  ],
})
export class AddSkillPageModule {}
