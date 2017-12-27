import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListJobsPage } from './list-jobs';

@NgModule({
  declarations: [
    ListJobsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListJobsPage),
  ],
})
export class ListJobsPageModule {}
