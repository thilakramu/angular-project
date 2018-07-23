var offsetValue = 0;
var loadingMore = false;
var noMoreRecords = false;
var isFreshSearch = false;

$(window).scroll(function() {
	if ($(window).scrollTop() + $(window).height() > $(document).height() - 320) {
		serviceProviderList();
	}
});

function serviceProviderList() {
	
	if (loadingMore || noMoreRecords) {
		//console.log('already loading more or NO more.....');
		return;
	}
	
	loadingMore = true;
	
	var html = '';
	var searchParams = {};
	searchParams['start'] = offsetValue;
	searchParams['isValidate'] = $("#isValidate").val().trim();
	
	window.location.hash = jQuery.param(searchParams);	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getToken(),
		},
		url: CONFIG.get("ADMIN_API_URL") + "/sp/account/list",
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
				var name = data[i].firstName + ' ' + data[i].lastName;
				
				if (data[i].isValidate) {
					var validateBtn = '<button type="button " class="btn btn-success btn-sm">  Active  </button>';
				} else {
					var validateBtn = '<button type="button " class="btn btn-warning btn-sm" id="valid-'+data[i].id+'" onclick="serviceProviderUpdate(\'' + data[i].id + '\')">  Validate  </button>';
				}				
			
				html += '<tr id="' + data[i].id + '"><td>' + Capitalization(name) + '</td><td>' + data[i].email + '</td><td>' + data[i].spid + '</td><td>' + data[i].msisdn + '</td><td>' + data[i].companyName + '</td><td>' + data[i].companyAddress + '</td><td>'+ validateBtn +'</td></tr>';
			}
		}
		if (isFreshSearch) {
			$("#serviceproviders-list-body").html(html);
		} else {
			$("#serviceproviders-list-body").append(html);	
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


function serviceProviderUpdate(id) {
	
	if (!id) {
		return;
	}
	
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getToken(),
		},
		url: CONFIG.get("ADMIN_API_URL") + "/sp/account/update",
		type: "POST",
		data: {
			id: id,
			isValidate: true
		}
	})
	.done(function( json ) {
		console.log(json);
		$("#valid-" + id).text("Active");
		$("#valid-" + id).removeAttr("onclick");
		$("#valid-" + id).removeClass("btn-warning");
		$("#valid-" + id).addClass("btn-success");
		Modal.show("Info", "Updated successfully", "");
	})
	.fail(function( xhr, status, errorThrown ) {
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
	
	serviceProviderList();
}