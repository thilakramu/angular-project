import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceProviderComponent }      from './service-provider/service-provider.component';
import { FirmwareUpdateComponent }      from './firmware-update/firmware-update.component';
import { FirmwareHistoryComponent }      from './firmware-history/firmware-history.component';
import { FirmwareListComponent } from './firmware-list/firmware-list.component';

const sproutes: Routes = [
	{
		path: '',
		component: ServiceProviderComponent,
		children: [
			{
				path: 'firmware-update',
				component: FirmwareUpdateComponent
			},
			{
				path: 'firmware-history',
				component: FirmwareHistoryComponent
			},
			{
				path: 'firmware-list',
				component: FirmwareListComponent
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(sproutes) ],
	exports: [ RouterModule ]
})
export class ServiceProviderRoutingModule {}


/*import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirmwareUpdateComponent }      from './service-provider/firmware-update/firmware-update.component';

const routes: Routes = [
	{ path: 'firmware-update', component: FirmwareUpdateComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class ServiceProviderRoutingModule {}*/
