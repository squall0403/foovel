
(function(){
  // Define angular app
  var app = angular.module('myApp',[
    'ngRoute',
    'ionic'
  ]);

  app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $routeProvider.
    when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileController'
    }).
    otherwise('/');

    // $locationProvider.hashPrefix('!');
  }]);

  app.controller('TabController', function($scope, $location){
    $scope.isActive = function(route) {
       return route === $location.path();
   }
  });

  app.controller('ProfileController', function($scope, $http){
    var settings = {
      method: 'GET',
      url: 'http://test.fastget.net/api/profiles/4',
      headers:{"authorization": "Basic ZGRnZ2VlOkZnMTAwITIzNA=="},
      async: true,
      crossDomain: true
    }
      $http(settings).then(function(data){
          $scope.profile = data.data;
      })
  });
})();
