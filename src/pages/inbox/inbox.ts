import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CurrentUser } from '../../providers/current-user';
import { backendProvider } from '../../providers/backend-service';
import { ToastController } from 'ionic-angular';

import { reciept } from '../history/reciept';
import { DisplayRecieptPage } from '../display-reciept/display-reciept';

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
	unReadReciepts: any;
	name: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public currentuser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
		this.unReadReciepts = [];
		this.name = this.currentuser.getUser().username;
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad InboxPage');
        this.backend.getUnread (this.name).subscribe (
			data => {
				for (let d in data.reciepts)
					this.unReadReciepts.push (
						new reciept (
							data.reciepts[d].recieptID,
							data.reciepts[d].reciept_date,
							data.reciepts[d].store,
							data.reciepts[d].amount,
							data.reciepts[d].category,
							data.reciepts[d].tags,
							data.reciepts[d].sharedWith
						)
					);
				this.presentToast('Successfully retrieved un-read shared reciepts', 'toastrSuccess');
			}, 
			err => {
				this.presentToast('Error: Could not add reciept', 'toastrFail');
			}
      );
	}
	
	displayReciept (selectedReciept: any) {
		// update the existing db
		this.presentToast('Will be implemented soon', 'toastrInfo');
		this.navCtrl.push(DisplayRecieptPage, {currReciept: selectedReciept});
		this.backend.updateSharedReciept(this.name, selectedReciept.recieptID).subscribe (
			data => {
				this.presentToast('Successfully updated database', 'toastrSuccess');
			},
			err => {
				this.presentToast('Could not update database', 'toastrFail');
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
