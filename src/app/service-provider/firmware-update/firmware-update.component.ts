import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-firmware-update',
  templateUrl: './firmware-update.component.html',
  styleUrls: ['./firmware-update.component.css']
})
export class FirmwareUpdateComponent implements OnInit {

  constructor(private titleService:Title) {
	  this.titleService.setTitle("Firmware Update");
  }

  ngOnInit() {
  }
  
	value: Date;
}
