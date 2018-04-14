import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { AddReceiptPage } from '../add-receipt/add-receipt';
import { ViewActivityPage } from '../view-activity/view-activity';
import { Chart } from 'chart.js';
import  { user } from '../signup/user';

import { reciept } from '../history/reciept';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: Chart;
  pieChartdataArray=[];
  pielabelsArray=[];
  currentUser: any;
  // reciepts: any;

  image: any;
  base64Image: any;
  // recentlyTakenPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private diagnostic: Diagnostic) {
    // this.currentUser = this.navParams.get('newUser');    // uncomment when sign up or login is the root page
    this.currentUser = new user('test1', 'test1@gmail.com', 'test', '');
  }

  createChart () {

    var config = {
      type: 'doughnut',
      data: {
          datasets: [{
              data: this.pieChartdataArray,
          }],
          labels: this.pielabelsArray,
      },
      options: {
          responsive: true,
          legend: {
              position: 'top',
          },

          tooltips: {
              callbacks: {
                  // label: function(tooltipItem, data) {
                  //     var currentValue = that.pieTooltipsArray[tooltipItem.index];
                  //     return currentValue;
                  // }
              }
          }
      }
  };
  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, config);
  }
  ionViewDidLoad () {
    this.chartTest();
  }


  chartTest() {
    new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Utilies", "Store", "Restraurants", "Misc."],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
          data: [1478,267,734,100]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'April 2018'
        }
      }
  });

Chart.pluginService.register({
  beforeDraw: function(chart) {
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    ctx.restore();
    var fontSize = (height / 150).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#CC3D3D";

    var text = "Total" ,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2 ;

    ctx.fillText(text, textX, textY);

    var text2 = "$ 2,579" ,
        textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
        textY2 = height /2 + height / 11;

    ctx.fillText(text2, textX2, textY2);

    ctx.save();
  }
});
  }


  viewHistory () {
    // this.navCtrl.setRoot(HistoryPage);
    this.navCtrl.push(HistoryPage);
  }

  addReceipt(){
    this.navCtrl.push(AddReceiptPage);
  }

  viewActivity(){
    this.navCtrl.push(ViewActivityPage);
  }

  takePicture () {
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
        let recentlyTakenPhoto  = 'data:image/jpeg;base64,' + imageData;
        this.navCtrl.push(AddReceiptPage, {recentlyTakenPhoto: recentlyTakenPhoto});
       }, (err) => {
        alert('something went wrong');
       });
    }).catch((errorCallback)=> {
      alert('camera is not ready');
      this.navCtrl.push(AddReceiptPage);
    });
  }
}
