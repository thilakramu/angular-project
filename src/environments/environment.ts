// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let apiHost: string = 'https://dev.rgw.calix.ai';

export const environment = {
	production: false,
	apiHost: 'https://dev.rgw.calix.ai',
	API_DOMAIN_NAME: apiHost,
	ADMIN_API_BASE_URL: apiHost + '/map/v1/admin/calix',
	SP_API_BASE_URL: apiHost + '/map/v1/admin/sp',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
