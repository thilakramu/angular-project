var offsetValue = 0;
var loadingMore = false;
var noMoreRecords = false;
var isFreshSearch = false;

$(window).scroll(function() {
	if ($(window).scrollTop() + $(window).height() > $(document).height() - 320) {
		fmHistory();
	}
});

function fmHistory() {
	
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
		url: CONFIG.get("SP_API_URL") + "/swupgrade/event/history",
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
			var i, d, cld, s, sd;
			var total=0;
			var fail=0;
			var success=0;
			
			offsetValue += 0 + parseInt(length);
			
			for (i=0; i<length; i++) {
				d = new Date(data[i].created);
				cld = d.toLocaleString();				
				
				if (data[i].updateType == "immediate") {
					sd = '-';
				} else {
					s = new Date(data[i].scheduleDateTime);
					sd = s.toLocaleString();					
				}
				
				if (typeof data[i].status == "object" && data[i].status) {
					total = data[i].status.total;
					fail = data[i].status.fail;
					success = data[i].status.success;
				} else {
					total = 0;
					fail = 0;
					success = 0;
				}
				
			
				html += '<tr id="' + data[i].id + '"><td>' + cld + '</td><td>' + sd + '</td><td>' + data[i].firmwareVersion + '</td><td>' + data[i].modelNumber + '</td><td>' + data[i].updateType + '</td><td><button type="button" class="btn btn-default number-style" onclick="viewHistoryDetail(\'' + data[i].eventId + '\',\'\')">' + total + '</button></td><td><button type="button" class="btn btn-default number-style" onclick="viewHistoryDetail(\'' + data[i].eventId + '\',\'fail\')">' + fail + '</button></td><td><button type="button" class="btn btn-default number-style" onclick="viewHistoryDetail(\'' + data[i].eventId + '\',\'success\')">'+ success +'</button></td></tr>';
			}
		}
		if (isFreshSearch) {
			$("#firmware-history-body").html(html);
		} else {
			$("#firmware-history-body").append(html);	
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

function viewHistoryDetail(eventId, status) {
	
	var html = '';
	var searchParams = {};
	searchParams['eventId'] = eventId;
	if (status) {
		searchParams['status'] = status;	
	}	
	
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
			var i, s, sd, scheduleString, actionString, message;
			
			for (i=0; i<length; i++) {		
				sd = '-';
				if (data[i].updated) {
					s = new Date(data[i].updated);
					sd = s.toLocaleString();
				}								
				
				message = data[i].message ? data[i].message: '-';
				
				html += '<tr id="' + data[i].eventId + '"><td>' + data[i].macAddr + '</td><td>' + data[i].status + '</td><td>' + message + '</td><td>' + sd + '</td></tr>';
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

function freshSearch() {
	offsetValue = 0;
	loadingMore = false;
	noMoreRecords = false;
	
	isFreshSearch = true;
	
	fmHistory();
}