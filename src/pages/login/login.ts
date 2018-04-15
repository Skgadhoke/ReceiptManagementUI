import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { backendProvider } from '../../providers/backend-service';
import { user } from '../signup/user'
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SideMenuPage } from '../side-menu/side-menu';
import { SignupPage } from '../signup/signup'
import { CurrentUser } from '../../providers/current-user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	currUser: any
	isenabled:any
    constructor(public navCtrl: NavController, public navParams: NavParams, public currentuser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
		this.currUser = new user('','');
		this.isenabled = false;
	}

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
	}
	
	login () {
		this.backend.authUser (this.currUser).subscribe (
			succ => {
				console.log(succ);
				console.log(succ.users.length);
				if (succ.users.length != 0) {
					this.currUser.username = succ.users[0].username;
					this.currUser.email = succ.users[0].email;
					this.currUser.fcmID = succ.users[0].pushID;
					this.currUser.sharedRecieptUser = succ.users[0].sharedWith;
					this.currUser.userID = succ.users[0].userID;
					console.log(this.currUser);

					this.currUser.userID = succ;
					this.currentuser.setUser(this.currUser);
					// need to set user

					this.presentToast('Successfully logged in', 'toastrSuccess');
					// this.navCtrl.push(HomePage);
					this.navCtrl.push(SideMenuPage);
				} else {
					this.presentToast('Incorrect credentials please try again', 'toastrFail');
				}
			}, 
			err => {
				this.presentToast('Error: Could not log in', 'toastrFail');
			}
		);
	}

	private presentToast(message: any, toastCss: any) {
		let toast = this.toastCtrl.create({
		  message: message,
		  duration: 1500,
		  position: 'top',
		  cssClass: toastCss
		});
	  
		toast.onDidDismiss(() => {
		  console.log('Dismissed toast');
		});
	  
		toast.present();
	  }

	  userInput () {
		// alert('checked');
		if (this.currUser.username != '' && this.currUser.password != '') {
			this.isenabled = true;
		}
	}

	signUp () {
		this.navCtrl.push(SignupPage);
	}
}
