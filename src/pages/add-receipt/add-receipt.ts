import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { EditConfirmationPage } from '../edit-confirmation/edit-confirmation';
import { HistoryPage } from '../history/history';
import { reciept } from '../history/reciept';
import { CurrentUser } from '../../providers/current-user';
import { backendProvider } from '../../providers/backend-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-add-receipt',
  templateUrl: 'add-receipt.html',
})
export class AddReceiptPage {
    recentlyTakenPhoto: any;
    myReciept: reciept;
    isShared: any;
    currUser: any;
    isEnabled: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public currentUser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
		this.recentlyTakenPhoto = this.navParams.get('recentlyTakenPhoto');
		this.myReciept = new reciept();
		this.isShared = false;
		// this.currUser = this.currentUser.getProfile().username   
		this.currUser = 'test';
		this.isEnabled = false;
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AddReceiptPage');
    }

    save() {
        let sharedUser = '';
        if (this.isShared) {
			// sharedUser = this.currentUser.getProfile().sharedRecieptUser
			sharedUser = 'shared'; // as a temp
        }

        // this.navCtrl.push(EditConfirmationPage, {myReciept: this.myReciept, recentlyTakenPhoto: this.recentlyTakenPhoto});
        this.backend.createNewReciept (this.currUser, this.myReciept, sharedUser).subscribe
        (
            data => {
                console.log(data);
                // need to add toastr for successful sign up
                console.log('** success added reciept to db');

                this.backend.newPhoto (data, this.recentlyTakenPhoto).subscribe (
                    succ => {
                        this.presentToast('Successfully added reciept', 'toastrSuccess');
                    }, 
                    err => {
                        this.presentToast('Error: Could not add reciept', 'toastrFail');
                    }
                );
                this.navCtrl.push(HistoryPage);
            },
            error =>  { 
                // need to add toastr for failure sign up
                this.presentToast('Error: Could not add reciept', 'toastrFail');
                console.log('Error: failed to add reciept to db');
                console.log(error);
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
