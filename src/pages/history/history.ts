import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { reciept } from './reciept';
import { DisplayRecieptPage } from '../display-reciept/display-reciept';

import { CurrentUser } from '../../providers/current-user';
import { backendProvider } from '../../providers/backend-service';
import { ToastController } from 'ionic-angular';


@Component({
	selector: 'page-history',
	templateUrl: 'history.html',
})
export class HistoryPage {
	historyToggle: any;
	reciepts: any;
	showContent: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public currentuser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
		this.showContent = 0;
		this.reciepts = [];

		let name = this.currentuser.getUser().username;
		this.backend.getReciepts (name).subscribe
		(
			data => {
				for (let d in data.reciepts)
					this.reciepts.push (
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


			},
			error =>  { 
		// need to add toastr for failure sign up
			this.presentToast('Error: Could not load reciepts', 'toastrFail');
				console.log('Error: failed to add reciept to db');
				console.log(error);
			}
		);
	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad HistoryPage');
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

	parseInput (currDate) {
		let dateParts = currDate.split("-");
			var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
			return date;
	}

	filterByCal() {
		alert('filter by calander');
		this.showContent = 1;
	}

	filterByStore() {
		alert('filter by Store');
		this.showContent = 2;
	}

	filterByText() {
		alert('filter by Text');
		this.showContent = 3;
	}

	displayReciept (currReciept: any) {
		this.navCtrl.push(DisplayRecieptPage, {currReciept: currReciept});
	}

	segmentChanged () {}
}
