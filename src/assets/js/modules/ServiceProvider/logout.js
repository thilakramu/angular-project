function doLogout() {
	AUTH.setSpLoggedIn(false);
	AUTH.setSPToken('');
	window.location.href = "service_provider_login.html";
}