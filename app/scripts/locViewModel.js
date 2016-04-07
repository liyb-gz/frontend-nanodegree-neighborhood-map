/* globals console, ko */
'use strict';

// @param location - Object
// @param list - ListViewModel that contains this LocViewModel
function LocViewModel (location, list, map) {
	var self = this;

	// These variables don't change, so no need to use observables.
	self.name = location.name;
	self.coordinates = location.coordinates;
	self.list = list;

	self.marker = map.addMarker(self);

	// Observables
	self.isActive = ko.observable(false); //false by default

	// Methods
	self.setActive = function () {
		// List
		self.list.setCurrentLocation(self);
		self.isActive(true);

		// Map
		map.panTo(self);

		// Markers
		// map.resetMarkers();
		// self.marker.setActive();
	};

	self.resetActive = function () {
		self.isActive(false);
	};

	//Execute
}