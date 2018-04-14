import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { reciept } from '../history/reciept';
/**
 * Generated class for the DisplayRecieptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-display-reciept',
  templateUrl: 'display-reciept.html',
})
export class DisplayRecieptPage {
  selectedReciept: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedReciept = this.navParams.get('currReciept');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayRecieptPage');
  }

}
