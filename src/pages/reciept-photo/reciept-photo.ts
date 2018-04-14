import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
  selector: 'page-reciept-photo',
  templateUrl: 'reciept-photo.html',
})
export class RecieptPhotoPage {
  image: any;
  base64Image: any;
  recentlyTakenPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private diagnostic: Diagnostic) {
    this.recentlyTakenPhoto = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecieptPhotoPage');
  }

  public takePicture () {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    // must ask the user for permissions
    this.diagnostic.isCameraAvailable().then(successCallback => {
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.recentlyTakenPhoto  = 'data:image/jpeg;base64,' + imageData;
         console.log(this.recentlyTakenPhoto);
       }, (err) => {
        alert('something went wrong');
       });
    }).catch((errorCallback)=> {
      alert('camera is not ready');
    });
  }
}
