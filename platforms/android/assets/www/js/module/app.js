
(function(){
  // Define angular app
  var app = angular.module('myApp',[
    'myProfile',
    'myFavourites',
    'ngRoute',
    'ionic'
  ]);

  app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
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

    // $locationProvider.hashPrefix('!');
  }]);

  app.controller('TabController', function($scope, $location){
    $scope.isActive = function(route) {
       return route === $location.path();
   }
  });

})();
