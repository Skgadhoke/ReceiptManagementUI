import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';


import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { AddReceiptPage } from '../add-receipt/add-receipt';

import { LoginPage } from '../login/login'
import { InboxPage } from '../inbox/inbox';


@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage: any = HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Profile', component: ProfilePage },
      { title: 'Home', component: HomePage },
      { title: 'Inbox', component: InboxPage },
      // { title: 'Sign Up', component: SignupPage },
      // { title: 'Login', component: LoginPage },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideMenuPage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
