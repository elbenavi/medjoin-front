import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    public isLogged = false;

    login() {
        // if (localStorage.getItem('auth_token') !== null) {
        //     this.isLogged = true;
        // } else {
        //     this.isLogged = false;
        // }
        const exp = this.getTokenExpiration();
        if (!exp) {
            return false;
        }
        const now = new Date();
        const secondsSinceEpoch = Math.round(now.getTime() / 1000);
        const dateExp = new Date(exp);
        if (secondsSinceEpoch >= dateExp.getTime()) {
            this.logout();
            return false;
        } else {
            return true;
        }
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiration');
    }

    getTokenExpiration() {
        if (this.getToken()) {
            const decode = jwt_decode(this.getToken());
            return decode.exp;
        } else {
            return null;
        }
    }

    getToken() {
        return localStorage.getItem('auth_token');
    }

    getUser() {
        return localStorage.getItem('auth_token');
    }
}
