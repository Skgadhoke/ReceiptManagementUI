import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { backendProvider } from '../../providers/backend-service';

import { ToastController } from 'ionic-angular';
import { user } from '../signup/user';

import { CurrentUser } from '../../providers/current-user';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	myUser: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public currentUser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
		this.myUser = this.currentUser.getUser();
	}

    ionViewDidLoad() {
      console.log('ionViewDidLoad ProfilePage');
    }

	editUserInfo () {
		this.presentToast('Will be implemented soon', 'toastrInfo');
	}

    addPartner() {
			this.currentUser.setUser(this.myUser);
			console.log(this.myUser);
			this.backend.updateUser(this.myUser).subscribe (
				succ => {
					this.presentToast('Successfully added partner', 'toastrSuccess');
				}, 
				err => {
					this.presentToast('Error: Could not add reciept', 'toastrFail');
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
		
		help () {
			this.navCtrl.push(SettingsPage);
		}
}
