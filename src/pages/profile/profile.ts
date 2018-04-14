import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  addPartner(){
    if(document.getElementById("id-message").getAttribute("hidden")==null)
    {
    	console.log("click");
    	document.getElementById("id-label").innerHTML="Partner ID: " 
    	document.getElementById("id-message").setAttribute("hidden", "true");
    	document.getElementById("add-btn").innerHTML="Edit";
 
    }
    else
    {
        document.getElementById("id-message").removeAttribute("hidden");
        document.getElementById("id-message").innerHTML="Edit Partner's ID";
        
        document.getElementById("add-btn").innerHTML="Add Partner";
    }


  }
}
