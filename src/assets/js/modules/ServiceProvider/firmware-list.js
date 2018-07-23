var offsetValue = 0;
var loadingMore = false;
var noMoreRecords = false;
var isFreshSearch = false;

$(window).scroll(function() {
	if ($(window).scrollTop() + $(window).height() > $(document).height() - 320) {
		fmList();
	}
});

function fmList() {
	
	if (loadingMore || noMoreRecords) {
		//console.log('already loading more or NO more.....');
		return;
	}
	
	loadingMore = true;
	
	var html = '';
	var searchParams = {};
	searchParams['start'] = offsetValue;
	
	window.location.hash = jQuery.param(searchParams);	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_URL") + "/swupgrade/event/status",
		data: searchParams,
		type: "GET",
	})
	.done(function( jdata ) {
		
		if (offsetValue === 0) {
			//TODO - remove all old rows
		}
		
		if (jdata && jdata.results) {
			var data = jdata.results;
			var length = data.length;
			var i, d, cld, s, sd, scheduleString, actionString;
			
			offsetValue += 0 + parseInt(length);
			
			for (i=0; i<length; i++) {
				
				s = new Date(data[i].scheduleDateTime);
				sd = s.toLocaleString();	
				
				/*scheduleString = '<strong>' + Capitalization(data[i].updateType) + '</strong> <br>';
				
				if (data[i].updateType == 'schedule') {
					scheduleString += ' ' + sd;
				}*/
				
				actionString = '<button type="button " class="btn btn-primary button-style" id="" onclick="viewHistoryDetail(\'' + data[i].eventId + '\')">View </button>  <button type="button" class="btn btn-primary button-style" id="" onclick="updateHistoryDetail(\'' + data[i].eventId + '\',\'' + data[i].firmwareVersion + '\')"> Edit </button>  <button type="button" class="btn btn-primary button-style" onclick="deleteEventHistory(\'' + data[i].eventId + '\')">Delete</button>';
			
				html += '<tr id="' + data[i].eventId + '"><td>' + data[i].firmwareVersion + '</td><td>' + data[i].modelNumber + '</td><td>' + sd + '</td><td>' + actionString + '</td></tr>';
			}
		}
		if (isFreshSearch) {
			$("#firmware-list-body").html(html);
		} else {
			$("#firmware-list-body").append(html);	
		}
		
		isFreshSearch = false;		
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
		loadingMore = false;
    });
	
}

function freshSearch() {
	offsetValue = 0;
	loadingMore = false;
	noMoreRecords = false;
	
	isFreshSearch = true;
	
	fmList();
}



function viewHistoryDetail(eventId) {
	
	var html = '';
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
			var i, d, cld, s, sd, scheduleString, actionString, message;
			
			for (i=0; i<length; i++) {				
				s = new Date(data[i].scheduleDateTime);
				sd = s.toLocaleString();				
				d = new Date(data[i].created);
				cld = d.toLocaleString();
				
				scheduleString = '<strong>' + Capitalization(data[i].updateType) + '</strong>';
				message = data[i].message ? data[i].message: '-';
				
				html += '<tr id="' + data[i].eventId + '"><td>' + data[i].macAddr + '</td><td>' + data[i].modelNumber + '</td><td>' + scheduleString + '</td><td>' + sd + '</td><td>' + data[i].status + '</td><td>' + cld + '</td></tr>';
			}
		}
		
		$("#event-history-detail-body").html(html);
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
		loadingMore = false;
		$("#event-history-detail-modal").modal('show');
    });
	
}


function deleteEventHistory(eventId) {
	if (!eventId) {
		return;
	}
	
	eventId = eventId.trim().toString();
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},
		url: CONFIG.get("SP_API_URL") + "/swupgrade/event/delete?eventId="+eventId,
		type: "DELETE",
	})
	.done(function( jdata ) {
		$("#" + eventId).remove();
		
		Modal.show("Info", "Deleted successfully", "");
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
		
		if (xhr.responseJSON.errorType == "404") {
			Modal.show("Error", "", "");
			return;
		} else if (xhr.responseJSON.errorType == "401") {
			Modal.show("Error",xhr.responseJSON.errorDesc, "");
			return;
		} else if (xhr.responseJSON.errorType == "400") {
			Modal.show("Error","", "");
			return;
		} else if (xhr.responseJSON.errorType == "500") {
			Modal.show("Error",xhr.responseJSON.errorDesc, "");
			return;
		}
	});
}


function updateHistoryDetail(eventId, firmwareId) {
	if (!eventId) {
		return;
	}
	
	window.location.href = "firmware-event-update.html?eventId="+eventId+"&firmwareId="+firmwareId;
}

