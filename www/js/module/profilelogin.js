// Pro login control module
(function(){

  var profileLogin = angular.module('profileLogin', [

  ]); // module

  profileLogin.controller('ProfileLoginCtroller', function($scope, $http, $location){

    // Encrypt Base64 function
    function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
    } // Used to encrypt username add password to a string of Base64

    // check cache for local profiles
    var inLogPrf = localStorage.getItem('inLog'); // Get login info from cache

    if (inLogPrf) { // If login info is availavle, redirect user to profile page
      $location.path('/profile');
    }

    $scope.login = function(){
      var str = "Basic " + b64EncodeUnicode($scope.phone + ":" + $scope.password); // Assign encrypt info to var str

      var settings = { // Define settins for $http call
        method: 'GET',
        url: BASE_URL + 'profiles/',
        headers:{"authorization": str},
        async: true,
        crossDomain: true
      }

        $http(settings).then(function(data){ // Perform $http call
            localStorage.setItem('inLog',str); // on success log in, store login info to cache
            $location.path('/profile'); // redirect user to profile page
        }) // $http function
    } // login function
  }); // Controller

})();
