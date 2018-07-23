var offsetValue = 0;
var loadingMore = false;
var noMoreRecords = false;
var isFreshSearch = false;

$(window).scroll(function() {
	if ($(window).scrollTop() + $(window).height() > $(document).height() - 320) {
		swupgradeList();
	}
});

function swupgradeList() {
	
	if (loadingMore || noMoreRecords) {
		//console.log('already loading more or NO more.....');
		return;
	}
	
	loadingMore = true;
	
	var html = '';
	var searchParams = {};
	searchParams['start'] = offsetValue;
				
	searchParams['modelNumber'] = $("#seacrh_modelNumber").val().trim();
	searchParams['firmwareVersion'] = $("#search_firmwareVersion").val().trim();
	
	window.location.hash = jQuery.param(searchParams);	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getToken(),
		},
		url: CONFIG.get("ADMIN_API_URL") + "/swupgrade/firmware/list",
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
			var i;
			
			offsetValue += 0 + parseInt(length);
			
			for (i=0; i<length; i++) {
				var d = new Date(data[i].created);
				var ld = d.toLocaleString();
			
				html += '<tr id="' + data[i].id + '"><td>' + data[i].firmwareVersion + '</td><td>' + data[i].modelNumber + '</td><td>' + data[i].pcode + '</td><td>' + ld + '</td><td><button type="button " class="btn btn-primary button-style" onclick="deleteSW(\'' + data[i].id + '\')">  Delete  </button></td></tr>';
			}
		}
		if (isFreshSearch) {
			$("#sw-upgrade-list-body").html(html);
		} else {
			$("#sw-upgrade-list-body").append(html);	
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


function deleteSW(id) {
	//alert(id);
	$("#sw-delete-id").val(id);
	$("#delete-confirm-modal").modal('show');
}


function swupgradeDelete() {
	var id = $("#sw-delete-id").val().trim();
	
	if (!id) {
		return;
	}
	$("#swupgrade-delete-btn").prop("disabled", true);
	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getToken(),
		},
		url: CONFIG.get("ADMIN_API_URL") + "/swupgrade/firmware/delete?id=" + id,
		type: "DELETE",
	})
	.done(function( json ) {
		$("#delete-confirm-modal").modal('hide');
		$("#" + id).remove();
		
		Modal.show("Info", "Deleted successfully", "");
	})
	.fail(function( xhr, status, errorThrown ) {
		//console.dir( xhr );
		//console.dir( xhr.responseJSON );
		
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
	})
	.always(function( xhr, status ) {
		$("#swupgrade-delete-btn").prop("disabled", false);
    });
}


function freshSearch() {
	offsetValue = 0;
	loadingMore = false;
	noMoreRecords = false;
	
	isFreshSearch = true;
	
	swupgradeList();
}