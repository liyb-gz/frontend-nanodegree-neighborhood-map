/* globals console, ko, map */
'use strict';

// @param location - Object
// @param list - ListViewModel that contains this LocViewModel
function LocViewModel (location, list) {
	var self = this;

	// These variables don't change, so no need to use observables.
	self.name = location.name;
	self.coordinates = location.coordinates;
	self.list = list;

	self.marker = map.addMarker(self);
	self.marker.addListener('click', function () {
		self.setActive();
	});

	self.infoWindow = map.addInfoWindow(self);

	// Observables
	self.isActive = ko.observable(false); //false by default

	// Methods
	self.setActive = function () {
		// List
		self.list.setCurrentLocation(self);
		self.isActive(true);

		// Map
		map.panTo(self);

		// Resets
		map.resetMarkers(); //Stop other animations and reset colors
		map.resetInfoWindows();

		// Marker and InfoWindow
		self.marker.setActive();
		self.marker.bounce(function () {
			self.infoWindow.setActive();
		}); //Set this marker to animate
	};

	self.resetActive = function () {
		self.isActive(false);
	};
}