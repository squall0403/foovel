// General application module

(function(){
  BASE_URL = 'http://test.fastget.net/api/';
  LANGUAGE_URL = 'http://test.fastget.net/api/translations/';

  // Define angular app
  var app = angular.module('myApp',[
    'myProfile', //load module to control profile
    'myFavourites', //load module to control favourites
    'ngRoute',
    'pascalprecht.translate', //load module to control translation
    'ionic' //load module ionic
  ]);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){ // Config route Provider to navigate pages through the app
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
    otherwise('/');

    // $locationProvider.html5Mode(true).hashPrefix('');
  }]);

  // Start to control translation
  var userLang; // store user selected language
  var targetLang = {};

  app.config(['$translateProvider', function($translateProvider){ // Config translation Provider

    // Load static file
    $translateProvider.useStaticFilesLoader({
      prefix: 'res/languages/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  }]);

  app.factory('cordova', function () { // Event for device ready
    return {
      onReady: function(){
        document.addEventListener("deviceready", this.ready, false);
      },
      ready: function(){
        $('#loader').css('display','none');
        $('#main').css('display','block');

        profile();
        profileLogin();
        profileRegister();
      }
    }
  });

  app.controller('PlatformCtrl', function($scope, cordova) { // Controll to load device ready event
    cordova.onReady();

    // /Register service worker
    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', function() {
    //     navigator.serviceWorker.register('sw.js').then(function(registration) {
    //       // Registration was successful
    //       console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     }, function(err) {
    //       // registration failed :(
    //       console.log('ServiceWorker registration failed: ', err);
    //     });
    //   });
    // }

  });


  app.controller('TranslationController', ['$scope', '$translate', function($scope, $translate){ // Controller for translation provider, primarily getting languages packs, save to local storage
    $scope.langLoaded = false;

    if (!localStorage.getItem('lang')) { // Get user selected language from cache
      localStorage.setItem('lang','en');
      userLang = localStorage.getItem('lang');
    } else {
      userLang = localStorage.getItem('lang');
    }

    $translate.refresh(userLang);
    $translate.use(userLang); // translate using user selected language
    $scope.langLoaded=true;
  }]);



  app.controller('TabController', function($scope, $location){
    $scope.isActive = function(route) { // Set tab as active when user click on it
       return route === $location.path();
   }
  });


})();
