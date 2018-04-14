import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { HistoryPage } from '../pages/history/history';
import { AddReceiptPage } from '../pages/add-receipt/add-receipt';
import { DisplayRecieptPage } from '../pages/display-reciept/display-reciept';
import { ViewActivityPage } from '../pages/view-activity/view-activity';
import { EditConfirmationPage } from '../pages/edit-confirmation/edit-confirmation';

import { SignupPage } from '../pages/signup/signup'
import { LoginPage } from '../pages/login/login'
import { InboxPage } from '../pages/inbox/inbox'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';

import { backendProvider } from '../providers/backend-service';
import { HttpModule} from '@angular/http';

import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { CurrentUser } from '../providers/current-user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    HistoryPage,
    AddReceiptPage,
    DisplayRecieptPage,
    ViewActivityPage,
    EditConfirmationPage,
    SignupPage,
    LoginPage,
    InboxPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    HistoryPage,
    AddReceiptPage,
    DisplayRecieptPage,
    ViewActivityPage,
    EditConfirmationPage,
    SignupPage,
    LoginPage,
    InboxPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Diagnostic,
    backendProvider,
    CurrentUser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
