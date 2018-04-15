import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { reciept } from '../history/reciept';

import { backendProvider } from '../../providers/backend-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-display-reciept',
  templateUrl: 'display-reciept.html',
})
export class DisplayRecieptPage {
	selectedReciept: any;
	recentlyTakenPhoto: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public backend: backendProvider) {
		this.selectedReciept = this.navParams.get('currReciept');
		this.recentlyTakenPhoto = '';
	}

	ionViewDidLoad() {
		this.backend.getPhoto (this.selectedReciept.recieptID).subscribe (
			data => { 
				this.recentlyTakenPhoto = data; 
				console.log('success data');
			},
			error =>  { 
				console.log('Error: failed to add reciept to db');
			}
		);
	}

	home () {
		this.navCtrl.setRoot(HomePage);
	}
}
