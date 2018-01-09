// Profile control ,odule
(function(){

  var myProfile = angular.module('myProfile', [
    'profileRegister', // Inject Profile register module
    'profileLogin' // Inject Profile login module
  ]);

  myProfile.controller('ProfileController', function($scope, $location, $http){
    // Encrypt Base64 function
    function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
    } // Used to encrypt username add password to a string of Base64

    var displayProfile = localStorage.getItem('inLog'); //Get log in data from cache
      $scope.profile = JSON.parse(displayProfile); // Set profile to elemet 0 in array, profile is linked to model in html template

      $scope.logOut = function(){ // Logout function
        localStorage.removeItem('inLog'); // Clear storage
        $location.path('/login'); // redirect to login page
      }

      $scope.changeLanguage = function(lang){ // function to change language
        var openedProfile = JSON.parse(displayProfile); // get profile from form
        openedProfile.language=lang; // assign new selected function to object
        localStorage.setItem('inLog', JSON.stringify(openedProfile)); // write new profile object to cache
        localStorage.setItem('lang', lang); // write new profile object to cache

        // Start to update profile
        var auth = localStorage.getItem('auth');
        var settings = { // Define settins for $http call
          method: 'PUT',
          url: openedProfile.url,
          async: true,
          crossDomain: true,
          headers:{
            "content-type": "application/json",
            "authorization": auth,
            'Access-Control-Allow-Methods':'*'
          },
          data:{
            "language":lang,
            "username":openedProfile.phone,
            "phone":openedProfile.phone
          }
        };
        $http(settings).then(function(data){
          console.log(data);
          location.reload(); // call function to reload page
        })

      };

  });
})();
