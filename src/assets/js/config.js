var CONFIG = (function() {
	
	var appHost = 'http://' + window.location.hostname + '/calixadmin';

    var apiHost = 'https://dev.rgw.calix.ai';  
	
	var googleMapKey = 'AIzaSyBRNeVraTEFQeodep8zSErfRf08u0Wzbqs';
	
    var _private = {
        'API_DOMAIN_NAME': apiHost,
        'ADMIN_API_BASE_URL': apiHost + '/map/v1/admin/calix',
        'SP_API_BASE_URL': apiHost + '/map/v1/admin/sp',
		'APP_HOST_URL':appHost,
		'GOOGLE_API_KEY':googleMapKey,
    };

    _private['ADMIN_API_URL'] = _private['ADMIN_API_BASE_URL'];
    _private['SP_API_URL'] = _private['SP_API_BASE_URL'];
	
	_private['API_URL'] = _private['ADMIN_API_BASE_URL'];
	_private['PUBNUB_PUBLISH_KEY'] = 'pub-c-a722a681-b7ca-45e4-9c93-03e029106f62';
    _private['PUBNUB_SUBSCRIBE_KEY'] = 'sub-c-cd20662c-5883-11e8-a697-1afc57e8b539';
    _private['PUBNUB_CHANNEL_NAME'] = 'demo';

    return {
        get: function(name) {
            return _private[name];
        }
    };
})();


var AUTH = {

    loggedIn: false,
    sploggedIn: false,

    isLoggedIn: function() {
        try {
            return this.loggedIn = (window.localStorage.getItem('calix.loggedIn') ? true : false);
        } catch(ex) {
            //
        }

        return false;
    },
    setLoggedIn: function(flag) {
        this.loggedIn = flag ? '1': null ;
        if (!this.loggedIn) {
            window.localStorage.removeItem('calix.loggedIn');
        } else {
            window.localStorage.setItem('calix.loggedIn', this.loggedIn);
        }

    },
    getToken: function() {
        return window.localStorage.getItem('calix.token_id');
    },
    setToken: function(token) {
        if (!token) {
            window.localStorage.removeItem('calix.token_id');
        } else {
            window.localStorage.setItem('calix.token_id', token);
        }
    },
	
	isSpLoggedIn: function() {
        try {
            return this.sploggedIn = (window.localStorage.getItem('calix.sploggedIn') ? true : false);
        } catch(ex) {
            //
        }

        return false;
    },	
	setSpLoggedIn: function(flag) {
        this.sploggedIn = flag ? '1': null ;
        if (!this.sploggedIn) {
            window.localStorage.removeItem('calix.sploggedIn');
        } else {
            window.localStorage.setItem('calix.sploggedIn', this.sploggedIn);
        }

    },	
	getSPToken: function() {
        return window.localStorage.getItem('calix.sp_token_id');
    },
    setSPToken: function(token) {
        if (!token) {
            window.localStorage.removeItem('calix.sp_token_id');
        } else {
            window.localStorage.setItem('calix.sp_token_id', token);
        }
    },
    
};


function checkValidEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}


//capitalization
function Capitalization(str) {
	if (typeof str == 'undefined') {
		return str;
	}

	return str.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
}


/**
 * return object Hash
 */
function fragmentHash() {
    return jQuery.deparam.fragment();
}

/**
 * @param {object} params
 */
function setFragment(params) {
    str = jQuery.param.fragment(window.location.hash, params);
    
    window.location.hash = str;
    
    return str;
}

function getSearchParams(k) {
	var p={};
	location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
	return k?p[k]:p;
}


