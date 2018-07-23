function doLogin() {

	var email, password;
	email = $("#email").val();
	password = $("#password").val();

	if (!email) {
		showError("Email is required");
		return;
	} else if (!checkValidEmail(email)) {
		showError("Please enter valid email");
		return;
	} else if (!password) {
		showError("Password is required");
		return;
	}
	
	$("#admin-login-btn").prop("disabled", true);

	$.ajax({
		url: CONFIG.get("SP_API_URL") + "/account/login",
		data: {
			email: email,
			password: password
		},
		type: "POST"
	})
	.done(function( json ) {		
		AUTH.setSpLoggedIn(true);
		AUTH.setSPToken(json.token);
		window.location.href = "firmware-update.html";
	})
	.fail(function( xhr, status, errorThrown ) {
		//console.dir( xhr );
		console.dir( xhr.responseJSON );
		
		if (xhr.responseJSON.errorType == "404") {
			showError("Invalid credentials");
			return;
		} else if (xhr.responseJSON.errorType == "401") {
			showError(xhr.responseJSON.errorDesc);
			return;
		} else if (xhr.responseJSON.errorType == "400") {
			showError("Invalid Credentials");
			return;
		} else if (xhr.responseJSON.errorType == "500") {
			showError(xhr.responseJSON.errorDesc);
			return;
		}
	})
	.always(function( xhr, status ) {
		$("#admin-login-btn").prop("disabled", false);
    });
}

function showError(str) {
	$("#error-text").text(str);
	$("#error").show();
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('sp-login-btn')
		.addEventListener('click', doLogin);
});