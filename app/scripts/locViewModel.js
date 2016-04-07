/* globals console, ko */
'use strict';

// @param location - Object
// @param list - ListViewModel that contains this LocViewModel
function LocViewModel (location, list) {
	var self = this;

	// These variables don't change, so no need to use observables.
	self.name = location.name;
	self.coordinates = location.coordinates;
	self.list = list;

	// Observables
	self.isActive = ko.observable(false); //false by default

	// Methods
	self.setActive = function () {
		self.list.setCurrentLocation(self);
		self.isActive(true);
	};

	self.resetActive = function () {
		self.isActive(false);
	};
}