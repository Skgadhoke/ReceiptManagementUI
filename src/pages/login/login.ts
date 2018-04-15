import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { backendProvider } from '../../providers/backend-service';
import { user } from '../signup/user'
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

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
				if (succ != '-1') {
					this.currUser.userID = succ;
					// this.currUser.username = 'test';
					// this.currUser.email = 'test@'; // will have to bring from result set

					this.currentuser.setUser(this.currUser);
					// need to set user

					this.presentToast('Successfully logged in', 'toastrSuccess');
					// this.navCtrl.push(HomePage);
					this.navCtrl.setRoot(HomePage);
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
}
