import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FirmwareListComponent } from './firmware-list/firmware-list.component';
import { ServiceProviderListComponent } from './service-provider-list/service-provider-list.component';
import { FirmwareUpdateComponent } from './firmware-update/firmware-update.component';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		AdminRoutingModule,
	],
	declarations: [AdminLayoutComponent, FirmwareListComponent, ServiceProviderListComponent, FirmwareUpdateComponent]
})
export class AdminModule { }
