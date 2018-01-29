var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		$('#loader').css('display', 'none');
		$('#main').css('display', 'block');
	},
};

// General application module

(function main() {
	BASE_URL = 'http://test.fastget.net/api/';
	LANGUAGE_URL = 'http://test.fastget.net/api/translations/';

	// Define angular app
	var app = angular.module('myApp', [
		'myMap', //load module to control map
    'myProfile', //load module to control profile
    'myFavourites', //load module to control favourites
    'ngRoute',
    'pascalprecht.translate', //load module to control translation
    'ionic' //load module ionic
  ]);

	// Declear global function

	app.service('GlobalFunction', function() {
		// Encrypt Base64 function
		this.b64EncodeUnicode = function(str) {
			return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
				function toSolidBytes(match, p1) {
					return String.fromCharCode('0x' + p1);
				}));
		} // Used to encrypt username add password to a string of Base64

		// Upload image service
		this.upload = function(uri, url, username, phone, language, auth, filekey) {
			try {
				var imageURI = uri.slice(0, uri.search("\\?"));
				// Verify server has been entered
				var server = url;
				if (server) {
					// Specify transfer options
					var options = new FileUploadOptions();
					options.fileKey = filekey;
					options.fileName = Math.random() + imageURI.substr(imageURI.lastIndexOf('/') + 1);
					options.mimeType = "image/jpeg";
					options.httpMethod = "PUT";
					options.chunkedMode = false;
					options.headers = {
						'authorization': auth,
						'Access-Control-Allow-Methods': '*'
					};
					var params = {};
					params.async = true;
					params.crossDomain = true;
					params.username = username;
					params.phone = phone;
					params.language = language;

					options.params = params;

					// Transfer picture to server
					var ft = new FileTransfer();
					ft.upload(imageURI, server, function(r) {
							window.cache.clear(function() {}, function() {});
							window.cache.cleartemp();
							location.reload();
						},
						function(error) {
							// alert("Upload failed: Code = "+error.code);
							// alert("Upload failed: Code = "+ JSON.stringify(error) );
						}, options);
				} else {
					// alert("Server Not Found");
				}
			} catch (exce) {
				alert(exce);
			}
		} // function upload
		// Upload image service
	});

	// Set up route Provider
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { // Config route Provider to navigate pages through the app
		$routeProvider.
		when('/profile', {
			templateUrl: 'partials/profile.html',
			controller: 'ProfileController'
		}).
		when('/favourites', {
			templateUrl: 'partials/favourites.html',
			controller: 'FavouriteController'
		}).
		when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'ProfileLoginCtroller'
		}).
		when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'ProfileRegisterCtroller'
		}).
		when('/', {
			templateUrl: 'partials/map.html',
			controller: 'MapController'
		}).
		otherwise('/');

  }]);

	// Set up route Provider

	// Start to control translation
	var userLang; // store user selected language
	var targetLang = {};

	app.config(['$translateProvider', function($translateProvider) { // Config translation Provider

		// Load static file
		$translateProvider.useStaticFilesLoader({
			prefix: 'res/languages/',
			suffix: '.json'
		});

		$translateProvider.preferredLanguage('en');
		$translateProvider.useSanitizeValueStrategy('escape');
  }]);

	// Set up Translation provider
	app.controller('TranslationController', ['$scope', '$translate', function($scope, $translate) { // Controller for translation provider, primarily getting languages packs, save to local storage
		$scope.langLoaded = false;

		if (!localStorage.getItem('lang')) { // Get user selected language from cache
			localStorage.setItem('lang', 'en');
			userLang = localStorage.getItem('lang');
		} else {
			userLang = localStorage.getItem('lang');
		}

		$translate.refresh(userLang);
		$translate.use(userLang); // translate using user selected language
		$scope.langLoaded = true;
  }]);
	// Set up Translation provider

	// Set up tab controller
	app.controller('TabController', function($scope, $location) {
		$scope.isActive = function(route) { // Set tab as active when user click on it
			return route === $location.path();
		}
	});
	// Set up tab controller

})();
