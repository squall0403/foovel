  var myMap = angular.module('myMap', [

  ]);

  myMap.controller('MapController', ['$scope', function($scope) {
    // Get current position
    var latCrd, lngCrd;
    var onSuccess = function(position) {

    latCrd = position.coords.latitude;
    lngCrd = position.coords.longitude;


    createmap();
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // Get current position

    // Create Map
    function createmap() {
      var map;
      var div = document.getElementById("map_canvas");

      map = plugin.google.maps.Map.getMap(div);
      map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

      function onMapReady() {
        // Move to the position with animation
        // map.moveCamera({
        //   target: {
        //     lat: latCrd,
        //     lng: lngCrd
        //   },
        //   zoom: 15,
        // },
        map.setOptions({
          // 'mapType': plugin.google.maps.MapTypeId.HYBRID,
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': false,
            'zoom': true,
            'mapToolbar': true // currently Android only
          },
          'gestures': {
            'scroll': true,
            'tilt': false,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'target': {
              lat: latCrd,
              lng: lngCrd
            },
            'zoom': 15,
            'bearing': 50
          },
          'preferences': {
            'zoom': {
              'minZoom': 0,
              'maxZoom': 17
            },
            'padding': {
              'left': 30,
              'top': 50,
              'bottom': 20,
              'right': 10
            }
          }
        });
      }
    } // Create map
  }]);
