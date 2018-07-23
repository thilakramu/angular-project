import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SpAuthService } from './sp-auth.service';

@Injectable({
	providedIn: 'root'
})
export class FirmwareHistoryService {

	constructor(private http: HttpClient,
				 private auth:SpAuthService) { }
	
	httpOptions = {
		headers: new HttpHeaders({
			'Authorization': 'Bearer ' + this.auth.getSPToken(),
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	getFWHistory(url) {
		return this.http.get(url, this.httpOptions);
	}

}
