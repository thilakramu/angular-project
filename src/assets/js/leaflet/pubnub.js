(function() {

    var PUBNUB_demo = PUBNUB.init({   //PUBNUB CONFIGURATION VARIABLES
        publish_key: CONFIG.get("PUBNUB_PUBLISH_KEY"),
        subscribe_key: CONFIG.get("PUBNUB_SUBSCRIBE_KEY"),
		ssl : (('https:' == document.location.protocol) ? true : false)
    });

    PUBNUB_demo.subscribe({  //PUBNUB Subscriber
        channel: CONFIG.get("PUBNUB_CHANNEL_NAME"),
        message: function(pubnunResponse) {			
            if(pubnunResponse.messageType=='agent'){
				//var agent = pubnunResponse.apps[0].name ? pubnunResponse.apps[0].name : "";
				var city = pubnunResponse.message.city ? pubnunResponse.message.city : '';
				var country = pubnunResponse.message.country ? pubnunResponse.message.country : '';
				var agent = '';
				var agents = pubnunResponse.apps;
				var agentsArr = [];
				if (typeof agents == 'object' && agents) {
					for (var i=0; i<agents.length; i++) {
						agentsArr.push(agents[i].name);
					}
				}
				agentInfo = "Mac Id : " + pubnunResponse.macAddr + "<br/> Agent : " + agentsArr.join(", ") + "<br/> Location : " + city + ", " + country;
				randomToast(agentInfo);
				locations.push({
					macAddr: pubnunResponse.macAddr,   //Mac address
					lat: pubnunResponse.location.lat,  //latitude
					lng: pubnunResponse.location.lon,  //longitude
					info: agentInfo                     //Tootltip text
				});
				initMap();	
			}			
        }
    });
})();