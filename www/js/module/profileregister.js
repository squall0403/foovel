// Profile register module
(function profileRegister(){
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
        "authorization": "Basic ZmFzdGdldDpGZHNhJDMyMQ==",
        'Access-Control-Allow-Methods':'*',
        'Access-Control-Allow-Origin':'*'
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
        "language":localStorage.getItem('lang')
      };

      // Call API to create profile
      settings.data = Object.assign(settings.data,profileObject);
      console.log(JSON.stringify(settings.data));

      try {
        $http(settings).then(function(data){
            alert('Accout created, Logging in')
            var localProfile = JSON.stringify(data.data);
            var auth = b64EncodeUnicode(profileObject.username + ":" + profileObject.password);
            localStorage.setItem('auth',auth);
            localStorage.setItem('inLog',localProfile); // on success log in, store login info to cache
            $location.path('/profile'); // redirect user to profile page
        });
      } catch (e) {
        console.log(e);
      }

    };
    // Finish Registration

  });

})();
