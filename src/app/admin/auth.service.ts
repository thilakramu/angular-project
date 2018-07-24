import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() { }

	loggedIn: any = false;
	
	isLoggedIn() {
        try {
            return this.loggedIn = (window.localStorage.getItem('calix.loggedIn') ? true : false);
        } catch(ex) {
            //
        }

        return false;
    }
	
	setLoggedIn(flag) {
        this.loggedIn = flag ? '1': null ;
        if (!this.loggedIn) {
            window.localStorage.removeItem('calix.loggedIn');
        } else {
            window.localStorage.setItem('calix.loggedIn', this.loggedIn);
        }

    }
	
	getToken() {
        return window.localStorage.getItem('calix.token_id');
    }
	
    setToken(token) {
        if (!token) {
            window.localStorage.removeItem('calix.token_id');
        } else {
            window.localStorage.setItem('calix.token_id', token['token']);
        }
    }
}
