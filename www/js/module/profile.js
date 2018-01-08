// Profile control ,odule
(function(){

  var myProfile = angular.module('myProfile', [
    'profileRegister', // Inject Profile register module
    'profileLogin' // Inject Profile login module
  ]);

  myProfile.controller('ProfileController', function($scope, $location){

    var displayProfile = localStorage.getItem('inLog'); //Get log in data from cache
      $scope.profile = JSON.parse(displayProfile); // Set profile to elemet 0 in array, profile is linked to model in html template

      $scope.logOut = function(){
        localStorage.removeItem('inLog');
        $location.path('/login');
      }
  });
})();
