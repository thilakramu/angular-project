import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SpAuthService {

	constructor() { }
	
	sploggedIn: any = false;
	
	isSpLoggedIn() {
        try {
            return this.sploggedIn = (window.localStorage.getItem('calix.sploggedIn') ? true : false);
        } catch(ex) {
            //
        }

        return false;
    }
	
	setSpLoggedIn(flag) {
        this.sploggedIn = flag ? '1': null ;
        if (!this.sploggedIn) {
            window.localStorage.removeItem('calix.sploggedIn');
        } else {
            window.localStorage.setItem('calix.sploggedIn', this.sploggedIn);
        }

    }
	
	getSPToken() {
        return window.localStorage.getItem('calix.sp_token_id');
    }
	
    setSPToken(token) {
        if (!token) {
            window.localStorage.removeItem('calix.sp_token_id');
        } else {
            window.localStorage.setItem('calix.sp_token_id', token['token']);
        }
    }

	
}
