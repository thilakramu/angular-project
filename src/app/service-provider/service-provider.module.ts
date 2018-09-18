import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';

import { ServiceProviderRoutingModule } from './service-provider-routing.module';
import { FirmwareUpdateComponent } from './firmware-update/firmware-update.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { FirmwareHistoryComponent } from './firmware-history/firmware-history.component';
import { FirmwareListComponent } from './firmware-list/firmware-list.component';
import { SpAuthService } from './sp-auth.service';
import { EventStatusService } from './event-status.service';

@NgModule({
	imports: [
		CommonModule,
		ServiceProviderRoutingModule,
		CalendarModule,
		DialogModule
	],
	declarations: [FirmwareUpdateComponent, ServiceProviderComponent, FirmwareHistoryComponent, FirmwareListComponent],
	providers: [
		SpAuthService,
		EventStatusService
	],
})
export class ServiceProviderModule { 
	get
}
