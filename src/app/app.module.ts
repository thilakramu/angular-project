import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

/*import { ServiceProviderModule }            from './service-provider/service-provider.module';*/

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppRoutingModule } from './/app-routing.module';
import { MapUpdateComponent } from './map-update/map-update.component';
import { SpLoginComponent } from './sp-login/sp-login.component';
import { SpLogoutComponent } from './sp-logout/sp-logout.component';

@NgModule({
	declarations: [
		AppComponent,
		AdminLoginComponent,
		MapUpdateComponent,
		SpLoginComponent,
		SpLogoutComponent,

	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		/*ServiceProviderModule*/
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
