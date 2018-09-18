import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FirmwareListComponent } from './firmware-list/firmware-list.component';
import { ServiceProviderListComponent } from './service-provider-list/service-provider-list.component';
import { FirmwareUpdateComponent } from './firmware-update/firmware-update.component';
import { BubbleComponent } from './bubble/bubble.component';

const adminRoutes: Routes = [
	{
		path: '',
		component: AdminLayoutComponent,
		children: [
			{
				path: 'firmware-update',
				component: FirmwareUpdateComponent
			},
			{
				path: 'firmware-list',
				component: FirmwareListComponent
			},
			{
				path: 'service-provider-list',
				component: ServiceProviderListComponent
			},
			{
				path: 'bubble-chart',
				component: BubbleComponent
			}			
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(adminRoutes) ],
	exports: [ RouterModule ]
})
export class AdminRoutingModule { }
