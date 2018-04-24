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

import { CurrentUser } from '../../providers/current-user';
import { backendProvider } from '../../providers/backend-service';
import { ToastController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild('doughnutCanvas') doughnutCanvas;
	doughnutChart: Chart;
	pieChartdataArray=[];
	pielabelsArray=[];
	currUser: any;
	isSharedEnabled: any;
	// reciepts: any;

	image: any;
	base64Image: any;
	categoryMap: any;
	total: string;
	option:any;
	// recentlyTakenPhoto: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private diagnostic: Diagnostic, public currentuser: CurrentUser, public backend: backendProvider, private toastCtrl: ToastController) {
		this.currUser = this.currentuser.getUser(); //new user('test1', 'test1@gmail.com', 'test', '');
		this.categoryMap = {'utilities': 0, 'restaurants': 0, 'groceries': 0, 'misc': 0, 'shopping': 0}
		this.total = '';
		this.option = "personal";


		if (this.currUser.sharedWith == '') {
			this.isSharedEnabled = false;
		} else {
			this.isSharedEnabled = true;
		}
	}

	ionViewDidLoad () {
		this.backend.getReciepts (this.currUser.username).subscribe
		(
			data => {
				let reciepts = [];
				for (let d in data.reciepts)
					reciepts.push (
						new reciept (
							data.reciepts[d].recieptID,
							data.reciepts[d].reciept_date,
							data.reciepts[d].store,
							data.reciepts[d].category,
							data.reciepts[d].tags,
							data.reciepts[d].sharedWith,
							data.reciepts[d].amount
						)
					);
				this.currentuser.setReciepts(reciepts);
				let myTotal = 0;
				for (let r in reciepts) {
					if (reciepts[r].sharedWith == '') {
						if (reciepts[r].category != '') {
							let val = this.categoryMap[reciepts[r].category];
							let amt = reciepts[r].amount + val;
							this.categoryMap[reciepts[r].category] = amt;
							myTotal = myTotal +amt;
	
						} else {
							let val = this.categoryMap['misc'];
							let amt = reciepts[r].amount + val;
							this.categoryMap['misc'] = amt;
							myTotal = myTotal +amt;
						}
					}
				}
				console.log('Mytotal...'+myTotal.toFixed(2));
				this.total = "$ " + myTotal.toFixed(2).toString();
				console.log("My total..."+this.total);

				console.log(data.reciepts);
				console.log(this.categoryMap);
				this.chartTest();

			},
			error =>  { 
		// need to add toastr for failure sign up
			this.presentToast('Error: Could not load reciepts', 'toastrFail');
				console.log('Error: failed to get reciepts to db');
				console.log(error);
			}
		);
	}

	chartTest() {
		this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
			type: 'doughnut',
			data: {
			datasets: [{
				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9", "#FFA500"],
				data: [this.categoryMap['utilities'],this.categoryMap['restaurants'], this.categoryMap['groceries'], this.categoryMap['shopping'], this.categoryMap['misc']]
			}],
			labels: ['Utilities', 'Restaurants', 'Groceries', 'Shopping & Entertainment', 'Misc']
			},
			options: {
				title: {
					display: true,
					text: 'April 2018',
					fontSize:30
				},
				tooltips: {
		            mode: 'index',
		            intersect: false,
		            callbacks: {
		                label: function (t, d) {
		                		var label = d.labels[t.index];
		                        return label+": "+ '$' + d.datasets[t.datasetIndex].data[t.index];
		                    }
		            }
		        }
			},
			centerText: {
				display: true,
				text: this.total,
			},

			
		});

		Chart.pluginService.register({
			beforeDraw: function(chart) {
				var width = chart.chart.width
				var height = chart.chart.height-40,
				ctx = chart.chart.ctx;

				ctx.restore();
				var fontSize = (height / 300).toFixed(2);
				ctx.font = fontSize + "em sans-serif";
				ctx.textBaseline = "middle";
				ctx.fillStyle = "#43c8bb";

				var text = "Total Spending" ,
					textX = Math.round((width - ctx.measureText(text).width) / 2),
					textY = height / 2 +60;

				ctx.fillText(text, textX, textY);
				var text2 = chart.config.centerText.text,
					textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
					textY2 = height /2 + height / 11+60;

				ctx.fillText(text2, textX2, textY2);

				ctx.save();
			}
		});
	}


	viewHistory () {
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
				// // let recentlyTakenPhoto = 'data:image/jpeg;base64,' + ''
				// console.log('******************************');
				// console.log(imageData);

				this.navCtrl.push(AddReceiptPage, {recentlyTakenPhoto: recentlyTakenPhoto});
				
			}, (err) => {
				this.presentToast('Something went wrong while opening the camera', 'toastrFail');
			});
		}).catch((errorCallback)=> {
			this.presentToast('camera cannot be openned at the moment', 'toastrFail');
			console.log(errorCallback);
			this.navCtrl.push(AddReceiptPage);
		});
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

	selectedPersonal()
	{
		this.doughnutChart.destroy();

		let reciepts = this.currentuser.getReciepts();
		console.log(reciepts);
		
		let myTotal = 0;
		this.categoryMap['utilities'] = 0;
		this.categoryMap['restaurants'] = 0;
		this.categoryMap['groceries'] = 0;
		this.categoryMap['misc'] = 0;
		this.categoryMap['shopping'] = 0;

		for (let r in reciepts) {
			if (reciepts[r] != undefined && reciepts[r].sharedWith == '') {
				if (reciepts[r].category != '') {
					if (reciepts[r].amount != undefined) {
						let val = this.categoryMap[reciepts[r].category];
						let amt = reciepts[r].amount + val;
						this.categoryMap[reciepts[r].category] = amt;
						myTotal = myTotal +amt;
						console.log('amt: ' + amt);
						console.log('myTotal ==> ' + myTotal);
					} else {
						console.log('went wrong');
					}
	
				} else {
					if (reciepts[r].amount != undefined) {
						let val = this.categoryMap['misc'];
						let amt = reciepts[r].amount + val;
						this.categoryMap['misc'] = amt;
						myTotal = myTotal +amt;
						console.log('amt: ' + amt);
						console.log('myTotal ==> ' + myTotal);
					} else {
						console.log('went wrong');
					}
					
				}
				
			}
		}
		console.log('Mytotal...'+myTotal.toFixed(2));
		this.total = "$ " + myTotal.toFixed(2).toString();
		console.log("My total..."+this.total);

		console.log(this.categoryMap);
		this.chartTest();

	}
	selectedShared()
	{
		this.doughnutChart.destroy();

		let reciepts = this.currentuser.getReciepts();
		console.log(reciepts);
		
		let myTotal = 0;
		this.categoryMap['utilities'] = 0;
		this.categoryMap['restaurants'] = 0;
		this.categoryMap['groceries'] = 0;
		this.categoryMap['misc'] = 0;
		this.categoryMap['shopping'] = 0;

		for (let r in reciepts) {
			if (reciepts[r] != undefined && reciepts[r].sharedWith != '') {
				if (reciepts[r].category != '') {
					if (reciepts[r].amount != undefined) {
						let val = this.categoryMap[reciepts[r].category];
						let amt = reciepts[r].amount + val;
						this.categoryMap[reciepts[r].category] = amt;
						myTotal = myTotal +amt;
						console.log('amt: ' + amt);
						console.log('myTotal ==> ' + myTotal);
					} else {
						console.log('went wrong');
					}
	
				} else {
					if (reciepts[r].amount != undefined) {
						let val = this.categoryMap['misc'];
						let amt = reciepts[r].amount + val;
						this.categoryMap['misc'] = amt;
						myTotal = myTotal +amt;
						console.log('amt: ' + amt);
						console.log('myTotal ==> ' + myTotal);
					} else {
						console.log('went wrong');
					}
					
				}
				
			}
		}
		console.log('Mytotal...'+myTotal.toFixed(2));
		this.total = "$ " + myTotal.toFixed(2).toString();
		console.log("My total..."+this.total);

		console.log(this.categoryMap);
		this.chartTest();
	}

	selectedBoth()
	{
		this.doughnutChart.destroy();

		let reciepts = this.currentuser.getReciepts();
		console.log(reciepts);
		
		let myTotal = 0;
		this.categoryMap['utilities'] = 0;
		this.categoryMap['restaurants'] = 0;
		this.categoryMap['groceries'] = 0;
		this.categoryMap['misc'] = 0;
		this.categoryMap['shopping'] = 0;

		for (let r in reciepts) {
			if (reciepts[r] != undefined) {
				if (reciepts[r].category != '') {
					if (reciepts[r].amount != undefined) {
						let val = this.categoryMap[reciepts[r].category];
						let amt = reciepts[r].amount + val;
						this.categoryMap[reciepts[r].category] = amt;
						myTotal = myTotal +amt;
						console.log('amt: ' + amt);
						console.log('myTotal ==> ' + myTotal);
					} else {
						console.log('went wrong');
					}
	
				} else {
					if (reciepts[r].amount != undefined) {
						let val = this.categoryMap['misc'];
						let amt = reciepts[r].amount + val;
						this.categoryMap['misc'] = amt;
						myTotal = myTotal +amt;
						console.log('amt: ' + amt);
						console.log('myTotal ==> ' + myTotal);
					} else {
						console.log('went wrong');
					}
					
				}
				
			}
		}
		console.log('Mytotal...'+myTotal.toFixed(2));
		this.total = "$ " + myTotal.toFixed(2).toString();
		console.log("My total..."+this.total);

		console.log(this.categoryMap);
		this.chartTest();
	}
}
