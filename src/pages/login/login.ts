import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { backendProvider } from '../../providers/backend-service';
import { user } from '../signup/user'
import { ToastController, LoadingController } from 'ionic-angular';
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
    constructor(public navCtrl: NavController, public navParams: NavParams, public currentuser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
		this.currUser = new user('','');
		this.isenabled = false;
	}

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
	}
	
	login () {
		// this.presentLoadingCustom();

		let loading = this.loadingCtrl.create({
			spinner: 'crescent'
		});
	
		loading.present().then (() => {
			// uncomment for testing purpose so you don't have to hit the endpoint every single time
			// this.currUser.username = 'Test';
			// this.currUser.email = 'Test@gmail.com';
			// this.currUser.sharedRecieptUser = 'Beta';
			// this.currUser.userID = '1';
			// this.currUser.userPic = '';
			// this.currentuser.setUser(this.currUser);
			// this.navCtrl.push(SideMenuPage);
			// loading.dismiss();

			this.backend.authUser (this.currUser).subscribe (
				succ => {
					console.log(succ.users.length);
					if (succ.users.length != 0) {
						this.currUser.username = succ.users[0].username;
						this.currUser.email = succ.users[0].email;
						this.currUser.fcmID = succ.users[0].pushID;
						this.currUser.sharedRecieptUser = succ.users[0].sharedWith;
						this.currUser.userID = succ.users[0].userID;
			         this.currUser.userPic = succ.users[0].profilePic;
						console.log(this.currUser);
	
						this.currUser.userID = succ;
						this.currentuser.setUser(this.currUser);
						this.navCtrl.push(SideMenuPage);
						loading.dismiss();
					} else {
						this.presentToast('Incorrect credentials please try again', 'toastrFail');
					}
				}, 
				err => {
					this.presentToast('Error: Could not log in', 'toastrFail');
				}
			);

			loading.onDidDismiss(() => {
				console.log('Dismissed loading');
			});
		});
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

	resentLoadingDefault() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
	
		loading.present();
	
		setTimeout(() => {
			loading.dismiss();
		}, 5000);
	}
	
	presentLoadingCustom() {
		let loading = this.loadingCtrl.create({
			spinner: 'crescent',
			// content: `
			// 	<div class="custom-spinner-container">
			// 		<div class="custom-spinner-box"></div>
			// 	</div>`,
			// duration: 2000
		});
	
		loading.onDidDismiss(() => {
			console.log('Dismissed loading');
		});
	
		loading.present();
	}
	
	presentLoadingText() {
		let loading = this.loadingCtrl.create({
			spinner: 'hide',
			content: 'Loading Please Wait...'
		});
	
		loading.present();
	
		setTimeout(() => {
			// this.nav.push(Page2);
		}, 1000);
	
		setTimeout(() => {
			loading.dismiss();
		}, 5000);
	}
}
