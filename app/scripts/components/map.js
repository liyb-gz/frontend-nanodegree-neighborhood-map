/* globals google*/
'use strict';
var map;

function Map () {
	var self = this;

	// Variables
	self.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 0, lng: 0},
		zoom: 12 //Default: 12
	});

	self.markers = [];
	self.infoWindows = [];

	// Methods
	self.addMarker = function (location) {
		var newMarker = new google.maps.Marker({
			position: location.coordinates,
			map: self.map,
			title: location.name
		});

		// Add useful operations to the marker here.
		// newMarker.functionName = function () {}
		newMarker.drop = function () {
			this.setAnimation(google.maps.Animation.DROP);
		};

		newMarker.bounce = function () {
			this.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function (marker) {
				marker.setAnimation(null);
			}, 1400, this); // Marker bouncing: 700ms per circle
		}

		self.markers.push(newMarker);
		return newMarker;
	};

	// TODO: map.resetAnimations
	// TODO: map.resetMarkers
	// TODO: marker.setActive

	self.panTo = function (location) {
		self.map.panTo(location.coordinates);
	}

	// Execute
}