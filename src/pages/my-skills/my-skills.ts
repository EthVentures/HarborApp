import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AddSkillPage } from '../add-skill/add-skill';

@IonicPage()
@Component({
  selector: 'page-my-skills',
  templateUrl: 'my-skills.html',
})
export class MySkillsPage {

  form:any;
  submitTitle = "";
  title = "";
  updating = false;
  skills = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authServiceProvider:AuthServiceProvider) {


  }

  ionViewWillEnter() {
    console.log(this.authServiceProvider.id);
    this.authServiceProvider.skillGet(this.authServiceProvider.id).subscribe(data => {
      console.log(data);
      this.skills = data.skills;
    });
  }

  add() {
    this.navCtrl.push(AddSkillPage, { state:'create' })
  }

  update(obj) {
    this.navCtrl.push(AddSkillPage, { state:'update', item:obj });
  }


}
