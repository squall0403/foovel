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
    var openedProfile = JSON.parse(displayProfile); // get profile from form
    var auth = localStorage.getItem('auth');
    var settings = { // Define settins for $http call
      method: 'PUT',
      url: '',
      async: true,
      crossDomain: true,
      headers:{
        "content-type": "application/json",
        "authorization": auth,
        'Access-Control-Allow-Methods':'*'
      },
      data:{
        "language":'',
        "username":'',
        "phone":''
      }
    };

      $scope.profile = JSON.parse(displayProfile); // Set profile to elemet 0 in array, profile is linked to model in html template

      $scope.logOut = function(){ // Logout function
        localStorage.removeItem('inLog'); // Clear storage
        localStorage.removeItem('auth'); // Clear storage
        $location.path('/login'); // redirect to login page
      }

      $scope.changeLanguage = function(lang){ // function to change language

        openedProfile.language=lang; // assign new selected function to object
        localStorage.setItem('inLog', JSON.stringify(openedProfile)); // write new profile object to cache
        localStorage.setItem('lang', lang); // write new profile object to cache

        // Start to update profile
        settings.url = openedProfile.url;
        settings.data.language = lang;
        settings.data.username = openedProfile.phone;
        settings.data.phone = openedProfile.phone;

        $http(settings).then(function(data){
          location.reload(); // call function to reload page
        })

      };

      // Edit info function
      var editObject;
      $scope.editObject = {}; // Edit edit object to store editing.
      $scope.editingPerson = function(){ // Start edit function
        $scope.editIndex = true; // Set edit stage to true
        angular.copy($scope.profile, $scope.editObject); //COpy current displayed profile to edit object --> not lose current profile if user cancel edit
      };

      // Save editing
      $scope.saveEdit = function(){
        // Prepare settings
        settings.url = openedProfile.url;
        settings.data.language = localStorage.getItem('lang');
        settings.data.first_name = $scope.editObject.first_name;
        settings.data.last_name = $scope.editObject.last_name;
        settings.data.username = $scope.editObject.phone;
        settings.data.phone = $scope.editObject.phone;
        settings.data.email = $scope.editObject.email;
        settings.data.address = $scope.editObject.address;

        localStorage.setItem('inLog', JSON.stringify($scope.editObject)); // write new profile object to cache
        angular.copy($scope.editObject, $scope.profile); // Copy edited profile to displayed profile

        $http(settings).then(function(data){
          location.reload(); // call function to reload page
        })

        $scope.editIndex = false;
      }// Save edited

      // Exit editIndex
      $scope.exitEdit = function(){
        $scope.editIndex = false; // Set edit stage to false
      };// Exit edit
  }); // controller

})();
