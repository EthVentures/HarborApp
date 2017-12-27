import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import dateformat from 'dateformat';
import { ListJobsPage } from '../list-jobs/list-jobs';

@Component({
  selector: 'page-my-resources',
  templateUrl: 'my-resources.html',
})
export class MyResourcesPage {

  datetime = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.datetime = dateformat(Date(), "fullDate");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyResourcesPage');
  }

  jobs() {
    this.navCtrl.push(ListJobsPage);
  }

  events = [
    {title:'French Class',description:'Intro to the french language',icon:'book'},
    {title:'English Class',description:'Explore grammer and conversation english',icon:'book'},
    {title:'Flu Shots',description:'UN is giving out free flu shot today',icon:'pulse'},
    {title:'How to build a Resume',description:'How to build a resume to apply for work',icon:'hand'},
    {title:'Anonymous HIV/AIDS testing',description:'Red Cross doing anonymous AIDS testing',icon:'pulse'},
    {title:"Private Women's Health",description:'Women doctors will give private, full health exams to women',icon:'pulse'},
  ];

}
