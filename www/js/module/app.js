
(function(){
  BASE_URL = 'http://test.fastget.net/api/';

  // Define angular app
  var app = angular.module('myApp',[
    'myProfile',
    'myFavourites',
    'ngRoute',
    'ionic'
  ]);

  app.config(['$routeProvider', function($routeProvider){
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

  }]);

  app.controller('TabController', function($scope, $location){
    $scope.isActive = function(route) {
       return route === $location.path();
   }
  });

})();
