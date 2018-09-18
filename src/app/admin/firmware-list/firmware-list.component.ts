import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-firmware-list',
	templateUrl: './firmware-list.component.html',
	styleUrls: ['./firmware-list.component.css']
})
export class FirmwareListComponent implements OnInit {

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.http.get('assets/sample.json?version=' + Math.random()).subscribe(data => {
			console.log(data);
		});
	}

}
