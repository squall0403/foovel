// Pro login control module
(function profileLogin(){

  var profileLogin = angular.module('profileLogin', [

  ]); // module

  profileLogin.controller('ProfileLoginCtroller', ['$scope', '$http', '$location', 'GlobalFunction',function($scope, $http, $location, GlobalFunction){

    // check cache for local profiles
    $scope.loggedIn = false;
    if (localStorage.getItem('inLog')) { // If login info is availavle, redirect user to profile page
      $scope.loggedIn = true;
      $location.path('/profile');
    }
    //Login function
    $scope.login = function(){
      var str = "Basic " + GlobalFunction.b64EncodeUnicode($scope.phone + ":" + $scope.password); // Assign encrypt info to var str

      var settings = { // Define settins for $http call
        method: 'GET',
        url: BASE_URL + 'profiles/',
        headers:{"authorization": str},
        async: true,
        crossDomain: true
      };

        $http(settings).then(function(data){ // Perform $http call
          var localProfile = JSON.stringify(data.data[0]);
          localStorage.setItem('auth',str);
          localStorage.setItem('inLog',localProfile); // on success log in, store login info to cache
          $location.path('/profile'); // redirect user to profile page
        }, function(response){
          alert('Can not login, please check your phone number and password');
        }) // $http function
    } // login function

  }]); // Controller

})();
