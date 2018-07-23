function serviceProviderSignup() {
	
	var params = {};

	var fields = $('#service-provider-signup-frm').serializeArray();
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
	
	
	if (!params['firstName']) {
		showError("First Name is required");
		return;
	} else if (!params['lastName']) {
		showError("Last Name is required");
		return;
	} else if (!params['email']) {
		showError("Email is required");
		return;
	} else if (!checkValidEmail(params['email'])) {
		showError("Enter valid email");
		return;
	} else if (!params['password']) {
		showError("password is required");
		return;
	} else if (!params['confirm_password']) {
		showError("Confirm password is required");
		return;
	} else if (params['password'] != params['confirm_password']) {
		showError("password and confirm password are not mached");
		return;
	} else if (!params['msisdn']) {
		showError("Mobile Number is required");
		return;
	} else if (!params['spid']) {
		showError("Service provider ID is required");
		return;
	} else if (!params['companyName']) {
		showError("Company Name is required");
		return;
	} else if (!params['companyAddress']) {
		showError("Company Address is required");
		return;
	} 
	
	$("#service-provider-signup-btn").prop("disabled", true);
	$.ajax({
		url: CONFIG.get("SP_API_BASE_URL") + "/account/add",
		type: "PUT",
		data: params,
		
	})
	.done(function( json ) {
		//console.log(json);
		$("#error").hide();
		$("#service-provider-signup-frm")[0].reset();
		
		Modal.show("Info", "User Registerd succssfully");
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
		$("#service-provider-signup-btn").prop("disabled", false);
    });
}
	

function showError(str) {
	$("#error-text").text(str);
	$("#error").show();
	$('html, body').animate({
        'scrollTop' : $("#error").position().top
    });
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('service-provider-signup-btn')
		.addEventListener('click', serviceProviderSignup);
});

