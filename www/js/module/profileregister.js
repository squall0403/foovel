(function(){
  var profileRegister = angular.module('profileRegister', [

  ]);

  profileRegister.controller('ProfileRegisterCtroller', function($scope, $http){
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
      }, function(response){
          alert('Can not create account');
      });

    };
    // Finish Registration


  });


})();
