import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobDetailsPage } from './job-details';

@NgModule({
  declarations: [
    JobDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(JobDetailsPage),
  ],
})
export class JobDetailsPageModule {}
