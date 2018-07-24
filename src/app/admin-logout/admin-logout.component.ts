import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../admin/auth.service';

@Component({
	selector: 'app-admin-logout',
	templateUrl: './admin-logout.component.html',
	styleUrls: ['./admin-logout.component.css']
})
export class AdminLogoutComponent implements OnInit {

	constructor(private router: Router,
				 private auth: AuthService) { }

	ngOnInit() {
		this.auth.setToken(null);
		this.auth.setLoggedIn(null);
		this.router.navigate(['/admin/login']);
	}

}
