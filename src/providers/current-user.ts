import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { user } from '../pages/signup/user';

@Injectable()
export class CurrentUser {
    userProfile: user;
    reciepts: any;
    myAvatarPic: any;   

    constructor() {
        // this.userProfile = new user('','','','','');
    }

    setUser (myUser: any) {
        this.userProfile = myUser;
    }

    getUser(): user {
        return this.userProfile;
    }

    setReciepts (myReciept: any) {
        this.reciepts = myReciept;
    }

    getReciepts (): any {
        return this.reciepts
    }

    updateUserPic (myPic) {
        this.userProfile.userPic = myPic;
    }
}

