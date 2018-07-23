		
			
$("#side-bar-image").css({
	height: $(document).height(),
});


$(window).resize(function(){
	var height = $(window).height();
	//console.log( height );
    $("#side-bar-image").css({
		height: height,
	});
	
	//console.log( $(document).height() );
});

$( document ).ready(function() {
    $("#map_update_rwap").prop("checked", true);
});

window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
 	/*$("#side-bar-image").css({
		height: $(document).height(),
	});*/
	
	//console.log($(document).height());
}, false);

$(document).ready(function () {                    
	sol = $('#my-select').searchableOptionList({
		maxHeight:'150px',
		allowNullSelection: true
	});
});


function getSelectedIps() {				
	selectedOptionsAsArray = sol.getSelection();
	var len = selectedOptionsAsArray.length;

	if (len) {
		$( ".sol-input-container" ).find( "input" ).attr( "placeholder", " " + len + " MAC address are selected" );	 
	} else {
		$( ".sol-input-container" ).find( "input" ).attr( "placeholder", " Select MAC Address " );
	}

}

function mapUpdateRwap() {
	 if ($("#map_update_rwap").prop("checked")) {
		 $("#map_update_rwap_fw_version").show();
		 $("#map_update_rwap_model_number").show();
	 } else {
		 $("#map_update_rwap_fw_version").hide();
		 $("#map_update_rwap_model_number").hide();
	 }
}

function showFirmwareDT() {
	$("#firmware_update_datetime").show();
}

function hideFirmwareDT() {
	$("#firmware_update_datetime").hide();
}
			
			
		