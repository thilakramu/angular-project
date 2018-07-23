var agent = "";
var locked = false;			
var locations = [];
var mdata = [];
var mlength;

var map = L.map("map", {
	attributionControl: false,
	zoomControl: false
}).setView(L.latLng(0, 0), 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	detectRetina: true,
	maxNativeZoom: 17
}).addTo(map);			

function initMap() {
	var leafletView = new PruneClusterForLeaflet();

	for (var i = 0, l = locations.length; i < l; ++i) {
		leafletView.RegisterMarker(new PruneCluster.Marker(locations[i].lat, locations[i].lng, {title: locations[i].info, macAddr: locations[i].macAddr}));
	}


	leafletView.PrepareLeafletMarker = function (marker, data) {	
		/* code for marker click event */
		marker.on('click', function(e){

			/* check previous ajax finished or not */
			if (locked) {
				return;
			}

			locked = true;

			/* Load MAC data */

			$.ajax({
				headers: {
					'Authorization': 'Bearer ' + AUTH.getToken(),
				},
				url: CONFIG.get("ADMIN_API_URL")+"/geo/telemetry/data",

				data: {
					macAddr: data.macAddr,
				},

				type: "GET",

			})
			.done(function( json ) {
				if (typeof json == 'object' && typeof json.result == 'object') {

					mdata = json.result;						
					mlength = mdata.length;	
					var city = mdata.message.city ? mdata.message.city + ", " : "";
					var country = mdata.message.country ? mdata.message.country : "";
					//var agent = mdata.apps[0] ? mdata.apps[0].name : "";
					var agent = '';
					var agents = mdata.apps;
					var agentsArr = [];
					if (typeof agents == 'object' && agents) {
						for (var i=0; i<agents.length; i++) {
							agentsArr.push(Capitalization(agents[i].name));
						}
					}
					agentInfo = "Mac Id : " + mdata.macAddr + "<br/> Agent : " + agentsArr.join(", ") + "<br/> Location : " + city + "" + country;		

					/* set tool tip data for marker */								
					if (marker.getPopup()) {
						marker.setPopupContent(agentInfo);
					} else {
						marker.bindPopup(agentInfo);
						marker.openPopup();
					}

				}

			})

			.fail(function( xhr, status, errorThrown ) {
				//alert( "Sorry, there was a problem!" );
				console.log( "Error: " + errorThrown );
				console.log( "Status: " + status );
				console.dir( xhr );
			})
			.always(function( xhr, status ) {
				locked = false;
			});

		});
	};

	map.addLayer(leafletView);
}



/* Ajax call to load map data */

$.ajax({
	headers: {
		'Authorization': 'Bearer ' + localStorage["token_id"],
	},

	url: CONFIG.get("ADMIN_API_URL")+"/geo/telemetry/all",

	data: {},

	type: "POST",

})
.done(function( json ) {
	if (typeof json == 'object' && typeof json.result == 'object') {

		mdata = json.result;						
		mlength = mdata.length;

		for (var i=0; i<mlength; i++) {
			agentInfo = "";
			locations.push({
				macAddr: mdata[i].macAddr,
				lat: mdata[i].location.lat,
				lng: mdata[i].location.lon,
				info: agentInfo
			});
		}						

	}

})
.fail(function( xhr, status, errorThrown ) {
	//alert( "Sorry, there was a problem!" );
	console.log( "Error: " + errorThrown );
	console.log( "Status: " + status );
	console.dir( xhr );
})			
.always(function( xhr, status ) {
	initMap();
});

//capitalization
function Capitalization(str) {
    if (typeof str == 'undefined') {
        return str;
    }

    return str.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};