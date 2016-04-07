/* globals console, ko */
'use strict';

// @param locations - Array
function ListViewModel (locations) {
	var self = this;

	// Define observables
	self.locations = ko.observableArray();
	self.currentLocation = ko.observable();
	self.filterKeyword = ko.observable('');

	self.filteredLocations = ko.computed(function () {
		return self.locations().filter(function (location) {
			return location.name.toLowerCase().indexOf(self.filterKeyword().toLowerCase()) > -1;
		});
	}, self);

	// Define methods
	self.sortLocations = function () {
		self.locations.sort(function (locA, locB) {
			if (locA.name > locB.name) {
				return 1;
			} else if (locA.name < locB.name) {
				return -1;
			} else {
				return 0;
			}
		});
	};

	self.setCurrentLocation = function (location) {
		self.resetLocation();
		self.currentLocation(location);
	};

	// Cancels all active status of the locations.
	self.resetLocation = function () {
		self.locations().forEach(function (location) {
			location.resetActive();
		});
	};

	// Execute

	// Load locations
	locations.forEach(function (location) {
		self.locations.push(new LocViewModel(location, self));
	});

	self.sortLocations();

	// The first location highlighted by default
	self.setCurrentLocation(self.locations()[0]);
	self.locations()[0].setActive();
}