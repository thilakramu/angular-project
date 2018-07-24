import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-firmware-update',
	templateUrl: './firmware-update.component.html',
	styleUrls: ['./firmware-update.component.css']
})
export class FirmwareUpdateComponent implements OnInit {

	constructor(
		private http: HttpClient,
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit() {
	}
	error: boolean = false;
	errorMsg: string;
	firmwareVersion: string;
	modelNumber: string;
	pcode: string;
	upfile: any;
	
	httpOptions = {
		headers: new HttpHeaders({
			'Authorization': 'Bearer ' + this.auth.getToken(),
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};
	
	onSubmit() {
		if (!this.firmwareVersion) {
			this.addError("Firmware Version is required");
			return;
		}
		
		if (!this.modelNumber) {
			this.addError("Model Number is required");
			return;
		}
		
		if (!this.pcode) {
			this.addError("Pcode is required");
			return;
		}
		
		if (!this.upfile) {
			this.addError("Image file is required");
			return;
		}
		
		this.http.post(environment.ADMIN_API_BASE_URL + '/swupgrade/firmware/create', {
			firmwareVersion: this.firmwareVersion,
			modelNumber: this.modelNumber
		}, this.httpOptions)
		.subscribe(
			res => {
				console.log(res);return;
				
				//this.router.navigate(['/admin/firmware-update']);
			},
			err => {
				console.log(err);
			}
		);
	}
	
	addError( msg: string ) {
		this.error = true;
		this.errorMsg = msg;
	}

}
