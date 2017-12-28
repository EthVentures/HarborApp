import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-add-skill',
  templateUrl: 'add-skill.html',
})
export class AddSkillPage {

  form:any;
  submitTitle = "";
  title = "";
  updating = false;
  start = Date();
  end = Date();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authServiceProvider:AuthServiceProvider) {

    this.form = {
      title:'',
      location:'',
      description:'',
      start:'',
      end:'',
      comments:''
    };
    var state = this.navParams.get('state');
    if (state == 'create') {
      this.submitTitle = "Add Skill";
      this.title = "Add Skill";
      this.updating = false;
    }
    if (state == 'update') {
      this.updating = true;
      this.title = "Update Skill";
      this.submitTitle = "Update Skill";
      this.form = this.navParams.get("item");
    }

  }

  ionViewDidLoad() {
    console.log(this.authServiceProvider.profile);
  }

  delete() {
    this.authServiceProvider.skillDelete(this.form['_id']).subscribe(data => {
      this.navCtrl.pop();
    });
  }

  create() {
    this.form['ref'] = this.authServiceProvider.id;
    if (this.updating) {
      this.authServiceProvider.skillUpdate(this.form).subscribe(data => {
        this.navCtrl.pop();
      });
    } else {
      this.authServiceProvider.skillCreate(this.form).subscribe(data => {
        this.navCtrl.pop();
      });
    }
  }

}
