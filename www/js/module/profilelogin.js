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

    if (localStorage.getItem('inLog')) { // If login info is availavle, redirect user to profile page
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
      };
        $http(settings).then(function(data){ // Perform $http call
          var localProfile = JSON.stringify(data.data[0]);
          localStorage.setItem('auth',str);
          localStorage.setItem('inLog',localProfile); // on success log in, store login info to cache
          $location.path('/profile'); // redirect user to profile page
        }, function(response){
          alert('Can not login, please check your phone number and password')
        }) // $http function
    } // login function
  }); // Controller

})();
