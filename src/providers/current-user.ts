import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { user } from '../pages/signup/user';

@Injectable()
export class CurrentUser {
    userProfile: user;

    constructor() {
        // this.userProfile = new user('','','','','');
    }

    setUser (myUser: any) {
        this.userProfile = myUser;
    }
    getUser(): user {
        return this.userProfile;
    }
}

