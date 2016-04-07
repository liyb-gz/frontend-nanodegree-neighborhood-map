/* globals google*/
'use strict';

function MapViewModel () {
	var self = this;

	// Variables
	self.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 0, lng: 0},
		zoom: 12 //Default: 12
	});

	self.markers = [];

	// Methods
	self.addMarker = function (location) {
		var newMarker = new google.maps.Marker({
			position: location.coordinates,
			map: self.map,
			title: location.name
		});

		self.markers.push(newMarker);
		return newMarker;
	};

	self.panTo = function (location) {
		self.map.panTo(location.coordinates);
	}

	// Execute

}