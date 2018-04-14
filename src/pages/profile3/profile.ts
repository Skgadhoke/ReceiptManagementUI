import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  addPartner(){
  	console.log("click");
  	document.getElementById("id-label").innerHTML="Partner ID: " 
  	document.getElementById("id-message").remove();
  	document.getElementById("add-btn").remove();

    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("CLICK ME");       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    document.getElementById("id-item").appendChild(btn);                    // Append <button> to <body>
  }

}