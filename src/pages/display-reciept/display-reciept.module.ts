import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayRecieptPage } from './display-reciept';

@NgModule({
  declarations: [
    DisplayRecieptPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayRecieptPage),
  ],
})
export class DisplayRecieptPageModule {}
