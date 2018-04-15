import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CurrentUser } from '../../providers/current-user';
import { backendProvider } from '../../providers/backend-service';
import { user } from '../signup/user'
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	currUser: any
    constructor(public navCtrl: NavController, public navParams: NavParams, public currentUser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
	}
	
	login () {
		this.backend.authUser (this.currUser).subscribe (
			succ => {
				this.presentToast('Successfully logged in', 'toastrSuccess');
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

}
