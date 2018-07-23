import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { SpAuthService } from '../service-provider/sp-auth.service';

@Component({
  selector: 'app-sp-logout',
  templateUrl: './sp-logout.component.html',
  styleUrls: ['./sp-logout.component.css']
})
export class SpLogoutComponent implements OnInit {

  constructor(private router: Router,
				private auth: SpAuthService) { }

  ngOnInit() {
	  this.auth.setSPToken(null);
	  this.auth.setSpLoggedIn(null);
	  this.router.navigate(['/sp/login']);
  }

}
