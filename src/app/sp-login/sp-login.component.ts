import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { environment } from '../../environments/environment';

import { SpAuthService } from '../service-provider/sp-auth.service';

@Component({
  selector: 'app-sp-login',
  templateUrl: './sp-login.component.html',
  styleUrls: ['./sp-login.component.css'],
})
export class SpLoginComponent implements OnInit {

    error: boolean = false;
	errorMsg: string;
	email: string = 'jae.jo@calix.com';
	password: string = '';

	constructor(private http: HttpClient,
				private router: Router,
				private auth: SpAuthService) { }

	ngOnInit() {
	}

	onSubmit() { 	
		//console.log(CONFIG.get('ADMIN_API_BASE_URL'));
		if (!this.email) {
			this.addError("Email is required");
			return;
		}

		if (!this.password) {
			this.addError("Password is required");
			return;
		}

		const req = this.http.post(environment.SP_API_BASE_URL + '/account/login', {
			email: this.email,
			password: this.password
		})
		.subscribe(
			res => {
				//console.log(res);				
				this.auth.setSpLoggedIn(true);
				this.auth.setSPToken(res);
				this.router.navigate(['/service-provider/firmware-update']);

			},
			err => {
				console.log(err);
				if (err.error.errorType == "404") {
					this.addError("Invalid credentials");
					return;
				} else if (err.error.errorType == "401") {
					this.addError(err.error.errorDesc);
					return;
				} else if (err.error.errorType == "400") {
					this.addError(err.error.errorDesc);
					return;
				} else if (err.error.errorType == "500") {
					this.addError(err.error.errorDesc);
					return;
				}
			}
		);
	}

	addError( msg: string ) {
		this.error = true;
		this.errorMsg = msg;
	}

}
