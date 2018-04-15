import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { backendProvider } from '../../providers/backend-service';
import { user } from './user'
import { HomePage } from '../home/home';

import { CurrentUser } from '../../providers/current-user';
import { ToastController } from 'ionic-angular';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})

export class SignupPage {
	newUser: any;
	isenabled: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public currentuser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
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
				if (data == '1') {
					// need to add toastr for successful sign up
					this.currentuser.setUser(this.newUser);
					console.log('** success signed up');
					console.log(this.newUser);				
					this.newUser.password = ''; // remove password for security reasons
					this.navCtrl.setRoot(HomePage);
				} else {
					this.presentToast('username already exists, please provide another username', 'toastrFail');
				}

			},
			error =>  { 
				// need to add toastr for failure sign up
				console.log('Error in signing up');
				this.presentToast('Something went wrong when signing up', 'toastrFail');
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
}
