import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AdminLoginComponent }      from './admin-login/admin-login.component';
import { SpLoginComponent } from './sp-login/sp-login.component';
import { SpLogoutComponent } from './sp-logout/sp-logout.component';

const routes: Routes = [
	{ path: 'admin/login', component: AdminLoginComponent },
	{ path: 'sp/login', component: SpLoginComponent },
	{ path: 'sp/logout', component: SpLogoutComponent },
	{ path: '', redirectTo: '/admin/login', pathMatch: 'full' },
	{
		path: 'service-provider',
		loadChildren: './service-provider/service-provider.module#ServiceProviderModule',
    },
];

@NgModule({
	imports: [ 
		RouterModule.forRoot(routes,
		   {
			enableTracing: false, // <-- debugging purposes only
			preloadingStrategy: SelectivePreloadingStrategy,

		  })
	  ],
	exports: [ RouterModule ],
	providers: [ SelectivePreloadingStrategy ]
})
export class AppRoutingModule {}