import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { user } from '../pages/signup/user';

@Injectable()
export class CurrentUser {
    public userProfile: user;
    public devAppNotiKey = '';
    public prodAppNotiKey = '';
    public prodIonProfile = '';
    public devIonProfile = '';
    //  public env = 'prod';
    public env = 'dev';

    constructor(public http: Http, public local: Storage) {
        console.log('Hello Provider');
        this.userProfile = new user('','','','');
    }

    updateProfile(sharedRecieptUser:string): void {
        this.userProfile.sharedRecieptUser = sharedRecieptUser;
        this.local.set("user-profile", this.userProfile);
    }

    setProfileSignUp(usrname: string): void {
        this.userProfile.username = usrname;
        this.userProfile.sharedRecieptUser = '';
        this.local.set("user-profile", this.userProfile);
    }

    // updateStatus(updatedStatus: boolean): void {
    //     // call a azure web call to check on status
    //     this.userProfile.status = updatedStatus;
    // }

    // updatePrimaryLocation(updatedLocation: string): void {
    //     this.userProfile.primaryLocation = updatedLocation;
    // }
    // getStatus(): any {
    //     return this.userProfile.status;
    // }
    getProfile(): any {
        this.local.get("user-profile").then((user) => {
            console.log(user.username);
            return user;
        });
    }
}

