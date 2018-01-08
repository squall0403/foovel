// General application module

(function(){
  BASE_URL = 'http://test.fastget.net/api/';

  // Define angular app
  var app = angular.module('myApp',[
    'myProfile', //load module to control profile
    'myFavourites', //load module to control favourites
    'ngRoute',
    'ionic' //load module ionic
  ]);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
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

  app.controller('TabController', function($scope, $location){
    $scope.isActive = function(route) { // Set tab as active when user click on it
       return route === $location.path();
   }
  });

})();
