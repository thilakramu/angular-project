import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Title} from "@angular/platform-browser";

import { environment } from '../../../environments/environment';
import { SpAuthService } from '../sp-auth.service';
import { FirmwareHistoryService } from '../firmware-history.service';
import { EventStatusService } from '../event-status.service';

@Component({
	selector: 'app-firmware-history',
	templateUrl: './firmware-history.component.html',
	styleUrls: ['./firmware-history.component.css']
})
export class FirmwareHistoryComponent implements OnInit {
	loadingMore = false;
	noMoreRecords = false;
	offsetValue = 0;
	length = 0;
	appendData = '';

	constructor(
		private http: HttpClient,
	 	private auth: SpAuthService,
		private fmService: FirmwareHistoryService,
		private esService: EventStatusService,
	 	private titleService:Title
	) {
		this.titleService.setTitle("Firmware History");
	}

	ngOnInit() {
		this.getHistory();
	}

	data: any[] = [];
	statusData: any[] = [];


	getHistory() {
		if (this.loadingMore || this.noMoreRecords) {
			return;
		}

		this.loadingMore = true;

		this.fmService.getFWHistory(environment.SP_API_BASE_URL + '/swupgrade/event/history?start='+this.offsetValue)
			.subscribe(data => {
			if (data['results'].length == 0) {
				this.noMoreRecords = true;
				return;
			}
			this.offsetValue += 0 + parseInt(data['results'].length);
			this.data.push.apply(this.data, data['results']);
			this.loadingMore = false;
		});
	}


	@HostListener("window:scroll", ["$event"])
	onWindowScroll() {
		//In chrome and some browser scroll is given to body tag
		let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
		let max = document.documentElement.scrollHeight;
		// pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
		if(pos == max )   {
			this.getHistory();
		}
	}
	
	/*Code for modal dialogue*/
	
	display: boolean = false;

    showDialog(eventId, status?) {
		if (!status) {
			status = '';
		}
		this.esService.getEventStatus(environment.SP_API_BASE_URL + '/swupgrade/event/history/detail?eventId='+eventId.toString()+'&status='+status)
			.subscribe(data => {
			if (data['results'].length == 0) {
				this.statusData = [];
			} else {
				//this.statusData = data['results'];
				let dta = this.statusData;
				let length = dta.length;
				let i, s, sd, scheduleString, actionString, message, html='';
				for (i=0; i<length; i++) {		
					sd = '-';
					if (dta[i].updated) {
						s = new Date(dta[i].updated);
						sd = s.toLocaleString();
					}								

					message = dta[i].message ? dta[i].message: '-';

					html += '<tr id="' + dta[i].eventId + '"><td>' + dta[i].macAddr + '</td><td>' + dta[i].status + '</td><td>' + message + '</td><td>' + sd + '</td></tr>';
				}
				
				this.appendData = html;
			}

			this.display = true;
		});
        
    }

}
