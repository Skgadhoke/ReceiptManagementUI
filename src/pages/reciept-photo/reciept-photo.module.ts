import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecieptPhotoPage } from './reciept-photo';

@NgModule({
  declarations: [
    RecieptPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(RecieptPhotoPage),
  ],
})
export class RecieptPhotoPageModule {}
