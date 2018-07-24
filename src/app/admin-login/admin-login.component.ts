import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthService } from '../admin/auth.service';

@Component({
	selector: 'app-admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
	error: boolean = false;
	errorMsg: string;
	email: string = 'testadmin@gmail.com';
	password: string = '';

	constructor(private http: HttpClient,
				private router: Router,
				private auth: AuthService) { }

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

		const req = this.http.post(environment.ADMIN_API_BASE_URL + '/account/login', {
			email: this.email,
			password: this.password
		})
		.subscribe(
			res => {
			//console.log(res);
				this.auth.setLoggedIn(true);
				this.auth.setToken(res);
				this.router.navigate(['/admin/firmware-update']);
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
