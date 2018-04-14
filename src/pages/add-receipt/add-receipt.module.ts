import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddReceiptPage } from './add-receipt';

@NgModule({
  declarations: [
    AddReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(AddReceiptPage),
  ],
})
export class AddReceiptPageModule {}
