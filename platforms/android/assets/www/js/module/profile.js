(function(){
  var myProfile = angular.module('myProfile', [
    'profileRegister',
    'profileLogin'
  ]);

  myProfile.controller('ProfileController', function($scope, $http){
    var settings = {
      method: 'GET',
      url: 'http://test.fastget.net/api/profiles/4',
      headers:{"authorization": "Basic ZHV5bnhhOkZnMTAwITIzNDU="},
      async: true,
      crossDomain: true
    }
      $http(settings).then(function(data){
          $scope.profile = data.data;
      })
  });
})();
