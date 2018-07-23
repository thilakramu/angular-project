function swupgradeCreate() {

	var firmwareVersion, modelNumber, pcode, upfile, refFlag, refFirmwareVersion, refModelNumber;
	firmwareVersion = $("#firmwareVersion").val();
	modelNumber = $("#modelNumber").val();
	pcode = $("#pcode").val();
	refFirmwareVersion = $("#refFirmwareVersion").val();
	refModelNumber = $("#refModelNumber").val();

	if (!firmwareVersion) {
		showError("Firmware Version is required");
		return;
	} else if (!modelNumber) {
		showError("Model Number is required");
		return;
	} else if (!pcode) {
		showError("pcode is required");
		return;
	}
	
	
	
	var form_Data = new FormData();
	
	var files = $( "input[name='upfile']" ).get(0).files;
	
	if (files.length) {
		var file_ext = files[0].name.split('.').pop();
			
		var allowed_extns = ["jpeg","JPEG", "PNG", "jpg", "png","JPG", "img", "IMG"];
		if (allowed_extns.indexOf(file_ext) == -1) {
			showError("Image extension will be an jpg or png file format");
			return;
		}


		$.each(files,function(i,file) {
			form_Data.append("upfile", file); 
		});
	} else {
		showError("Image is required");
		return;
	}	
	
	refFlag = $("input[name='refFlag']").prop("checked") ? true: false;
	
	$("#swupgrade-create-btn").prop("disabled", true);
	
	form_Data.append("firmwareVersion", firmwareVersion); 
	form_Data.append("modelNumber", modelNumber); 
	form_Data.append("pcode", pcode); 
	form_Data.append("refFlag", refFlag); 
	form_Data.append("refFirmwareVersion", refFirmwareVersion); 
	form_Data.append("refModelNumber", refModelNumber); 

	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getToken(),
		},
		url: CONFIG.get("ADMIN_API_URL") + "/swupgrade/firmware/create",
		data: form_Data,
		type: "POST",
		contentType: false,
		cache: false,
		processData: false,
	})
	.done(function( json ) {
		//console.log(json);
		$("#error").hide();
		$("#sw-create-form")[0].reset();
		Modal.show("Info", "Firmware added successfully", "");
		
		setTimeout(function(){ 
			window.location.reload(); 
		}, 2000);

	})
	.fail(function( xhr, status, errorThrown ) {
		//console.dir( xhr );
		//console.dir( xhr.responseJSON );
		
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
		} else if (xhr.responseJSON.errorType == "2") {
			showError(xhr.responseJSON.errorDesc);
			return;
		}
	})
	.always(function( xhr, status ) {
		$("#swupgrade-create-btn").prop("disabled", false);
    });
}

function showError(str) {
	$("#error-text").text(str);
	$("#error").show();
	$('html, body').animate({
        'scrollTop' : $("#card-actions").position().top
    });
}

function appendRefFirmWareList() {
	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getToken(),
		},
		url: CONFIG.get("ADMIN_API_URL") + "/swupgrade/firmware/list",
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
				options += '<option value="'+ data[i].firmwareVersion +'">'+ data[i].firmwareVersion +'</option>';
				modeloptions += '<option value="'+ data[i].modelNumber +'">'+ data[i].modelNumber +'</option>';
			}
			
			$("#refFirmwareVersion").append(options);
			$("#refModelNumber").append(modeloptions);
		}
			
	})
	.fail(function( xhr, status, errorThrown ) {
		console.log(xhr);
	})
	.always(function( xhr, status ) {
    });
}



document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('swupgrade-create-btn')
		.addEventListener('click', swupgradeCreate);
});