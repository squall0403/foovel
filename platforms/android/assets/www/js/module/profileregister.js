(function(){
  var profileRegister = angular.module('profileRegister', [

  ]);

  profileRegister.controller('ProfileRegisterCtroller', function($scope, $http){
    var profileObject={}
    var settings = {
      method: 'POST',
      url: 'http://test.fastget.net/api/profiles/',
      data: {},
      headers:{
        "x-csrftoken": "csrf",
        "content-type": "application/json",
        "authorization": "Basic ZmFzdGdldDpGZHNhJDMyMQ=="
      },
      async: true,
      crossDomain: true
    }

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

      console.log(profileObject);
      settings.data = Object.assign(settings.data,profileObject);

      $http(settings).then(function(data){
          // $scope.returnData = data.data;
          alert('Accout created, Logging in')
      }, function(response){
          alert('Can not create account');
      });

    }

  });

})();
