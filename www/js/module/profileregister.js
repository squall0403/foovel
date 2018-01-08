// Profile register module
(function(){
  var profileRegister = angular.module('profileRegister', [

  ]);

  profileRegister.controller('ProfileRegisterCtroller', function($scope, $http, $location){

    // Encrypt Base64 function
    function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
    } // Used to encrypt username add password to a string of Base64

    // Declear profile object
    var profileObject={};

    // Declare post options
    var settings = {
      method: 'POST',
      url: BASE_URL + 'profiles/',
      data: {},
      headers:{
        "x-csrftoken": "csrf",
        "content-type": "application/json",
        "authorization": "Basic ZmFzdGdldDpGZHNhJDMyMQ=="
      },
      async: true,
      crossDomain: true
    };

    // Define create profile function
    $scope.createProfile = function (){
      profileObject = {
        "username":this.phone,
        "first_name":this.first_name,
        "last_name":this.last_name,
        "phone":this.phone,
        "password":this.password,
        "address":this.address,
        "email":this.email,
      };

      // Call API to create profile
      settings.data = Object.assign(settings.data,profileObject);

      $http(settings).then(function(data){
          alert('Accout created, Logging in')
          var str = "Basic " + b64EncodeUnicode(profileObject.phone + ":" + profileObject.password); // Assign encrypt info to var str
          localStorage.setItem('inLog',str); // on success log in, store login info to cache
          $location.path('/profile'); // redirect user to profile page
      }, function(response){
          alert('Can not create account');
      });

    };
    // Finish Registration

  });

})();
