function doLogout() {
	AUTH.setLoggedIn(false);
	AUTH.setToken('');
	window.location.href = "admin_login.html";
}