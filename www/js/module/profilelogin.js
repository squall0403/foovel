(function(){
  var profileLogin = angular.module('profileLogin', [

  ]);

  profileLogin.controller('ProfileLoginCtroller', function($scope, $http){
    // Encrypt Base64 function
    function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
    }

    $scope.login = function(){
      var str = "Basic " + b64EncodeUnicode($scope.phone + ":" + $scope.password);

      var settings = {
        method: 'GET',
        url: BASE_URL + 'profiles/',
        headers:{"authorization": str},
        async: true,
        crossDomain: true
      }

        $http(settings).then(function(data){
            alert("Yeahhhh, Welcome " + data.data[0].first_name);
        })
    }
  });

})();
