var myMap = angular.module('myMap', [

]);

myMap.controller('MapController', ['$scope', function($scope) {
		$(document).ready(function() { // Get current position
			var latCrd, lngCrd;
			var networkState = navigator.connection.type;

			var onSuccess = function(position) {
				latCrd = position.coords.latitude;
				lngCrd = position.coords.longitude;
				createmap();
			};

			// onError Callback receives a PositionError object
			function onError(error) {
				alert('Location is not turn on, please turn on your location to use the app');
			}

			if (networkState !== "none") {
				// Get current position
				navigator.geolocation.getCurrentPosition(onSuccess, onError);
			} else {
				alert('No connection, please connect to internet to use the app');
			}
			// Create Map
			function createmap() {
				var map;
				var div = document.getElementById("map_canvas");
				map = plugin.google.maps.Map.getMap(div);
				map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

				function onMapReady() {
					map.setOptions({
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
							'bearing': 0
						},
						'preferences': {
							'zoom': {
								'minZoom': 0,
								'maxZoom': 17
							},
							'padding': {
								'left': 10,
								'top': 10,
								'bottom': 10,
								'right': 10
							}
						}
					});
					// Add a circle around current location
					map.addCircle({
						'center': {
							'lat': latCrd,
							'lng': lngCrd
						},
						'radius': 500,
						'strokeColor': '#0c60ee',
						'strokeWidth': 1,
						'fillColor': '#b7d2ff'
					});

					// Add a function on map click
					map.on(plugin.google.maps.event.MAP_CLICK, function(latLng) {
						// Add a marker and retrieve LatLng on map, display a marker on that position
						map.addMarker({
							'position': latLng,
							'title': JSON.stringify(latLng),
							animation: plugin.google.maps.Animation.DROP
						});
					});
				}

				$('#mapLoader').css('display', 'none');
				$('#map_canvas').css('display', 'block');
			}
		}); // Create map
} // Controller

]);
