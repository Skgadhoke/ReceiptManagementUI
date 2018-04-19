import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { reciept } from '../history/reciept';
import { backendProvider } from '../../providers/backend-service';
import { ToastController } from 'ionic-angular';
import { CurrentUser } from '../../providers/current-user';

@Component({
  selector: 'page-add-receipt',
  templateUrl: 'add-receipt.html',
})
export class AddReceiptPage {
    recentlyTakenPhoto: any;
    myReciept: reciept;
    isShared: any;
    currUsr: any;
    isEnabled: any;
    isSharedToggleEnsabled: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public currentuser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
		this.recentlyTakenPhoto = this.navParams.get('recentlyTakenPhoto');
        this.myReciept = new reciept();
        this.myReciept.day = -1;
        this.myReciept.store = '';
        this.myReciept.category = '';
        this.myReciept.tag = '';
        this.myReciept.sharedWith = '';


		this.isShared = false;
        this.isEnabled = false;
        this.currUsr = this.currentuser.getUser();

        this.isSharedToggleEnsabled = false;

        console.log(this.currUsr.sharedRecieptUser );

        if (this.currUsr.sharedRecieptUser) {
            this.isSharedToggleEnsabled = true;
        }
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AddReceiptPage');
    }

    save() {
        if (this.isShared) {
            console.log('shared: ' + this.isShared);
            this.myReciept.sharedWith = this.currUsr.sharedRecieptUser;
        } else {
            this.myReciept.sharedWith = '';
        }
        // this.navCtrl.push(EditConfirmationPage, {myReciept: this.myReciept, recentlyTakenPhoto: this.recentlyTakenPhoto});
        this.backend.createNewReciept (this.currUsr, this.myReciept).subscribe
        (
            data => {
                console.log(data);
                // need to add toastr for successful sign up
                console.log('** success added reciept to db');

                this.backend.newPhoto (data, this.recentlyTakenPhoto).subscribe (
                    succ => {
                        this.presentToast('Successfully added reciept', 'toastrSuccess');
                        this.navCtrl.push(HistoryPage);
                    }, 
                    err => {
                        this.presentToast('Error: Could not add reciept', 'toastrFail');
                        this.navCtrl.push(HistoryPage);
                    }
                );
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
      
      userInput () {
          if (this.myReciept.store && this.myReciept.amount) {
            this.isEnabled = true;
          }
      }
}
