import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { backendProvider } from '../../providers/backend-service';
import { user } from './user'
import { HomePage } from '../home/home';
import { CurrentUser } from '../../providers/current-user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  newUser: any;
  isenabled: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public backend: backendProvider, public currentUser: CurrentUser) {
    this.newUser = new user('', '', '','');
    this.isenabled = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignUp () {
    this.backend.postNewUser (this.newUser).subscribe
    (
        data => {
          // need to add toastr for successful sign up
          console.log('** success signed up');
          this.newUser.password = ''; // remove password for security reasons
          this.currentUser.setProfileSignUp(this.newUser.username);
          this.navCtrl.push(HomePage, {newUser: this.newUser});
        },
        error =>  { 
          // need to add toastr for failure sign up
          console.log('Error in signing up');
          console.log(error);
        }
    );
  }

  userInput () {
    // alert('checked');
    if (this.newUser.username != '' && this.newUser.email != '' && this.newUser.password != '') {
      this.isenabled = true;
    }
  }
}
