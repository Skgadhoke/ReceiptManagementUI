import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { backendProvider } from '../../providers/backend-service';

import { ToastController } from 'ionic-angular';
import { user } from '../signup/user';

import { CurrentUser } from '../../providers/current-user';
import { SettingsPage } from '../settings/settings';

import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	myUser: any;
	myAvatarPic: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public currentUser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController, private picker: ImagePicker) {
			this.myUser = this.currentUser.getUser();

			if (!this.myUser.userPic) {
				this.myAvatarPic = 'assets/img/img_avatar.png';
			} else {
				this.myAvatarPic = this.myUser.userPic;
			}
			
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

		removePartner () {
			this.presentToast('will be implemented soon', 'toastrInfo');
		}

		changeAvatar () {
			
			let options = {
				maximumImagesCount: 1,
				width: 500,
				height: 500,
				quality: 75,
				outputType: 1
			}
			this.picker.getPictures(options).then((results) => {
				for (var i = 0; i < results.length; i++) {
						console.log('Image URI: ' + results[i]);
						this.myAvatarPic = 'data:image/jpeg;base64,' + results[i];
						this.backend.updateProfileImage (this.myUser.username, this.myAvatarPic).subscribe (
							succ => {
								console.log('successfully added image to db');
								this.myUser = this.currentUser.updateUserPic(this.myAvatarPic);
							},
							err => {
								this.presentToast('Failed to update profile image, please try again', 'toastrFail');
							}
					) 
				}
			}, (err) => { });
		}
		
		
}
