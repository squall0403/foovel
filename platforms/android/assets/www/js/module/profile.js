// Profile control ,odule
(function(){

  var myProfile = angular.module('myProfile', [
    'profileRegister', // Inject Profile register module
    'profileLogin' // Inject Profile login module
  ]);

  myProfile.controller('ProfileController', function($scope, $http){

    var displayProfile = localStorage.getItem('inLog'); //Get log in data from cache

    var settings = { // Define settings for $http call
      method: 'GET',
      url: BASE_URL + 'profiles/',
      headers:{"authorization": displayProfile},
      async: true,
      crossDomain: true
    }

      $http(settings).then(function(data){ // Perform $http call
          $scope.profile = data.data[0]; // Set profile to elemet 0 in array, profile is linked to model in html template
      })
  });
})();
