var loadingMore = false;
function loadMacAddr() {
	/*var modelId = $("#modelId").val().trim();
	if (!modelId) {
		Modal.show("Info", "Please select Modal Number", "");
		
		return;
	}*/
	$("#myModal").modal('show');
}

function appendFirmWareList() {
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_BASE_URL") + "/swupgrade/firmware/list",
		data: {
			limit: 100
		},
		type: "GET",
	})
	.done(function( jdata ) {
		if (jdata && jdata.results) {
			var data = jdata.results;
			var length = data.length;
			var options= '';
			var modeloptions= '';
			for (var i=0; i< length; i++) {
				options += '<option value="'+ data[i].id +'">'+ data[i].firmwareVersion +'</option>';
				//modeloptions += '<option value="'+ data[i].modelNumber +'">'+ data[i].modelNumber +'</option>';
			}
			
			$("#firmwareId").append(options);
			//$("#modelId").append(modeloptions);
		}
			
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
    });
}

function appendRouterFirmWareVersions() {
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_BASE_URL") + "/swupgrade/router/firmwareversion",
		data: {
			limit: 100
		},
		type: "GET",
	})
	.done(function( jdata ) {
		if (jdata && jdata.results) {
			var data = jdata.results;
			var length = data.length;
			var options= '';
			for (var i=0; i< length; i++) {
				options += '<option value="'+ data[i].firmwareVersion +'">'+ data[i].firmwareVersion +'</option>';
			}
			
			$("#firmwareId").append(options);
		}
			
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
    });
}

function appendMAC(firmwareVersion, modelNumber, macAddr) {
	if (loadingMore) {
		//console.log('already loading more or NO more.....');
		return;
	}
	var params = {};
	if (macAddr) {
		params['macAddr'] = macAddr.toLowerCase();	
	}
	//params['modelNumber'] = modelNumber;
	params['limit'] = 100;
	
	loadingMore = true;
	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_BASE_URL") + "/swupgrade/router/list",
		data: params,
		type: "GET",
	})
	.done(function( jdata ) {
		if (jdata && jdata.results) {
			var data = jdata.results;
			var length = data.length;
			
			var halfLen = Math.round(length/2);
			
			var lmac= '';
			var rmac= '';
			
			for (var i=0; i< halfLen; i++) {
				lmac += '<label><input type="checkbox" name="mac_address[]" value="'+data[i].macAddr+'" id="mac_address'+ i +'" onchange="showSelectedMAC()">'+data[i].macAddr+'</label><br>';
			}
			
			for (var i=halfLen; i< length; i++) {
				rmac += '<label><input type="checkbox" name="mac_address[]" value="'+data[i].macAddr+'" id="mac_address'+ i +'" onchange="showSelectedMAC()">'+data[i].macAddr+'</label><br>';
			}
			
			$("#left-mac-div").html(lmac);
			$("#right-mac-div").html(rmac);
		}
			
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
		loadingMore = false;
    });
}


function getModelNumber() {
	//var firmwareVersion = $("#firmwareId option:selected").text();
	var firmwareVersion = $("#firmwareId").val();
	if (!firmwareVersion) {
		return;
	}
	
	var params = {};	
	params['firmwareVersion'] = firmwareVersion.trim();
	params['limit'] = 100;
	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_BASE_URL") + "/swupgrade/router/modelnumber/by/firmwareversion",
		data: params,
		type: "GET",
	})
	.done(function( jdata ) {
		if (jdata && jdata.results) {
			var data = jdata.results;
			var length = data.length;
			var modeloptions= '<option value="">select</option>';
			for (var i=0; i< length; i++) {
				modeloptions += '<option value="'+ data[i].id +'">'+ data[i].modelNumber +'</option>';
			}
			
			$("#modelId").html(modeloptions);
		}
			
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
    });
}

function showFirmwareDT() {
	$("#firmware_update_datetime").show();
}

function hideFirmwareDT() {
	$("#firmware_update_datetime").hide();
}


function swupgradeEventAdd() {

	var macAddr, firmwareId, modelId, updateType;
	var updateDateTime = 0;
	firmwareId = $("#firmwareId").val();
	modelId = $("#modelId").val();

	if (!firmwareId) {
		showError("Firmware Version is required");
		return;
	}
	
	if (!modelId) {
		showError("Model Number is required");
		return;
	}
	
	var params = {};

	var fields = $('#mac-address-form').serializeArray();
	jQuery.each(fields, function( i, field ) {
		if (typeof params[field.name] != 'undefined') {
			if (jQuery.type(params[field.name]) != 'array') {
				var old = params[field.name];
				params[field.name] = [old];
			}
			params[field.name].push(field.value);
		} else {
			params[field.name] = field.value;
		}
	});
	
	
	if (!params['mac_address[]']) {
		showError("Select the MAC Address");
		return;
	}
	
	if (jQuery.type(params['mac_address[]']) != 'array') {
		var old = params['mac_address[]'];
		params['mac_address[]'] = [old];
	}
		
	updateType = $('input[name=updateType]:checked').val();
	
	if (updateType == 'immediate') {
		updateDateTime = Number((new Date()).getTime());
	} else {
		var sd = $('input[name="start_date"]').val();
		var st = $('input[name="start_time"]').val();
		var strdate = sd + ' ' + st; 
		
		updateDateTime = Number((new Date(strdate)).getTime());

	}
	
	//updateDateTime="\/Date("+updateDateTime+")\/";
		
	var inpData = {
		firmwareId: modelId.toString().trim(),
		macAddr: params['mac_address[]'],
		updateType: updateType,
		updateDateTime: Number(updateDateTime),
	};
	
	//console.log($.param(inpData));return;
	
	$("#swupgrade-event-add-btn").prop("disabled", true);
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_BASE_URL") + "/swupgrade/event/add",
		type: "PUT",
		data: inpData,
		
	})
	.done(function( json ) {
		console.log(json);
		$("#error").hide();
		$("#sw-create-event-form")[0].reset();
		//Modal.show("Info", "Firmware Event added successfully", "");
		alert("Firmware Event added successfully");
		
		window.location.reload();
		
		/*setTimeout(function() {
			window.location.reload();
		}, 3000);*/
	})
	.fail(function( xhr, status, errorThrown ) {
		
		if (xhr.responseJSON.errorType == "404") {
			showError("");
			return;
		} else if (xhr.responseJSON.errorType == "401") {
			showError(xhr.responseJSON.errorDesc);
			return;
		} else if (xhr.responseJSON.errorType == "400") {
			showError("");
			return;
		} else if (xhr.responseJSON.errorType == "500") {
			showError(xhr.responseJSON.errorDesc);
			return;
		}
	})
	.always(function( xhr, status ) {
		$("#swupgrade-event-add-btn").prop("disabled", false);
    });
}
	

function showError(str) {
	$("#error-text").text(str);
	$("#error").show();
	$('html, body').animate({
        'scrollTop' : $("#card-actions").position().top
    });
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('swupgrade-event-add-btn')
		.addEventListener('click', swupgradeEventAdd);
});

