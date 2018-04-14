import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryPage } from '../history/history';

import { reciept } from '../history/reciept';

@Component({
  selector: 'page-edit-confirmation',
  templateUrl: 'edit-confirmation.html',
})
export class EditConfirmationPage {
  myReciept: any;
  recentlyTakenPhoto:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myReciept = this.navParams.get('myReciept');
    this.recentlyTakenPhoto = this.navParams.get('recentlyTakenPhoto');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditConfirmationPage');
  }

    viewHistory () {
    // this.navCtrl.setRoot(HistoryPage);
    this.navCtrl.push(HistoryPage);
  }

  

}
