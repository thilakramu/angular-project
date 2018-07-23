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
				modeloptions += '<option value="'+ data[i].modelNumber +'">'+ data[i].modelNumber +'</option>';
			}
			
			$("#firmwareId").append(options);
			$("#modelId").append(modeloptions);
		}
			
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
    });
}

function appendMAC(macArr) {
	/*
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_BASE_URL") + "/swupgrade/router/list",
		data: {
			limit: 100
		},
		type: "GET",
	})
	.done(function( jdata ) {
		if (jdata && jdata.results) {
			var data = jdata.results;
			var length = data.length;
			
			var halfLen = length/2;
			var lmac= '';
			var rmac= '';
			var macCheked = '';
			
			for (var i=0; i< halfLen; i++) {
				if (macArr.indexOf(data[i].macAddr) != -1) {
					macCheked = 'checked';
				}
				lmac += '<label><input '+ macCheked + ' type="checkbox" name="mac_address[]" value="'+data[i].macAddr+'" id="mac_address'+ i +'" onchange="showSelectedMAC()"  onclick="return false">'+data[i].macAddr+'</label><br>';
				
				macCheked = '';
			}
			
			for (var i=halfLen; i< length; i++) {
				if (macArr.indexOf(data[i].macAddr) != -1) {
					macCheked = 'checked';
				}
				
				rmac += '<label><input '+ macCheked + ' type="checkbox" name="mac_address[]" value="'+data[i].macAddr+'" id="mac_address'+ i +'" onchange="showSelectedMAC()"  onclick="return false">'+data[i].macAddr+'</label><br>';
				
				macCheked = '';
			}
			
			$("#mac_address_org_inp").attr("placeholder", macArr.length + " MAC Address selected");
			
			$("#left-mac-div").append(lmac);
			$("#right-mac-div").append(rmac);
		}
			
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
    });
	*/
	
	var data = macArr;
	var length = data.length;

	var halfLen = Math.round(length/2);

	var lmac= '';
	var rmac= '';

	for (var i=0; i< halfLen; i++) {
		lmac += '<label><input type="checkbox" name="mac_address[]" value="'+data[i]+'" id="mac_address'+ i +'" onchange="showSelectedMAC()" onclick="return false" checked>'+data[i]+'</label><br>';
	}

	for (var i=halfLen; i< length; i++) {
		rmac += '<label><input type="checkbox" name="mac_address[]" value="'+data[i]+'" id="mac_address'+ i +'" onchange="showSelectedMAC()" onclick="return false" checked>'+data[i]+'</label><br>';
	}
	
	$("#mac_address_org_inp").attr("placeholder", length + " MAC Address selected");
	$("#left-mac-div").html(lmac);
	$("#right-mac-div").html(rmac);
}

function showFirmwareDT() {
	$("#firmware_update_datetime").show();
}

function hideFirmwareDT() {
	$("#firmware_update_datetime").hide();
}


function swupgradeEventUpdate() {
	var urlEventId =  getSearchParams('eventId').trim();

	var macAddr, firmwareId, updateType, updateDateTime;
	firmwareId = $("#firmwareId").val();

	if (!firmwareId) {
		showError("Firmware Version is required");
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
		updateDateTime = Math.floor((new Date()).getTime());
	} else {
		var sd = $('input[name="start_date"]').val();
		var st = $('input[name="start_time"]').val();
		var strdate = sd + ' ' + st; 
		
		updateDateTime = Math.floor((new Date(strdate)).getTime());

	}
	var inpData = {
		firmwareId: firmwareId.toString().trim(),
		macAddr: params['mac_address[]'],
		updateType: updateType,
		updateDateTime: updateDateTime,
		eventId: urlEventId,
	};
	
	//console.log($.param(inpData));return;
	
	$("#swupgrade-event-add-btn").prop("disabled", true);
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_BASE_URL") + "/swupgrade/event/update",
		type: "POST",
		data: inpData,
		
	})
	.done(function( json ) {
		//console.log(json);
		$("#error").hide();
		//Modal.show("Info", "Firmware Event added successfully", "");
		alert("Firmware Event updated successfully");
		
		//window.location.reload();
		
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
		$("#swupgrade-event-update-btn").prop("disabled", false);
    });
}


function appendEventHistoryDetail(eventId, firmwareId) {
	if (!eventId) {
		return;
	}
	var searchParams = {};
	searchParams['eventId'] = eventId;
	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_URL") + "/swupgrade/event/history/detail",
		data: searchParams,
		type: "GET",
	})
	.done(function( jdata ) {
		if (jdata && jdata.results) {
			var data = jdata.results;
			var length = data.length;
			var i, d, cld, s, sd, scdate, sctime;
			var macArr = [];
			
			s = new Date(data[0].scheduleDateTime);
			sd = s.toLocaleString();	
			
			//console.log(sd.split(','));
			
			scdate = sd.split(',')[0].trim();
			sctime = sd.split(',')[1].trim();
			
			$('input[name="start_date"]').val(scdate);
			$('input[name="start_time"]').val(sctime);
			
			$("#firmwareId").val(firmwareId);
			$("#modelId").val(data[0].modelNumber);
			
			d = new Date(data[0].created);
			cld = d.toLocaleString();
			if (data[0].updateType == "immediate") {
				$("#updateType-immediate").prop("checked", true);
				hideFirmwareDT();
			} else {
				$("#updateType-schedule").prop("checked", true);
				showFirmwareDT();
			}
				
			for (i=0; i<length; i++) {			
				macArr.push(data[i].macAddr);
			}
			
			appendMAC(macArr);
		}
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
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
	document.getElementById('swupgrade-event-update-btn')
		.addEventListener('click', swupgradeEventUpdate);
});

