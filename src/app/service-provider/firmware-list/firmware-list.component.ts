import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-firmware-list',
  templateUrl: './firmware-list.component.html',
  styleUrls: ['./firmware-list.component.css']
})
export class FirmwareListComponent implements OnInit {

  constructor(private titleService:Title) { 
	  this.titleService.setTitle("Firmware List");
  }

  ngOnInit() {
  }

}
