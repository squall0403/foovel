// General application module

(function(){
  BASE_URL = 'http://test.fastget.net/api/';
  LANGUAGE_URL = 'http://test.fastget.net/static/languages/';

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

  var userLang; // store user selected language

  app.controller('TranslationController', ['$translate', function($translate){ // Controller for translation provider, primarily getting languages packs, save to local storage

    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang','en');
    } else {
      userLang = localStorage.getItem('lang');
    }

    $translate.use(userLang);

  }]);

  app.config(['$translateProvider', function($translateProvider){ // Config translation Provider

    $translateProvider.useStaticFilesLoader({
      prefix: 'http://test.fastget.net/static/languages/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  }]);

  app.controller('TabController', function($scope, $location){
    $scope.isActive = function(route) { // Set tab as active when user click on it
       return route === $location.path();
   }
  });


})();
