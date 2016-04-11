/* globals map, ko, LocViewModel */
/* exported ListViewModel */
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

	// Listener to filteredLocations
	self.filteredLocations.subscribe(function (newFilteredLocations) {
		// Always center the map to the first location (if there is one)
		if (newFilteredLocations.length > 0) {
			map.panTo(newFilteredLocations[0]);
		}
	});

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
		self.currentLocation(location);
	};

	// Execute
	// Load locations
	locations.forEach(function (location) {
		self.locations.push(new LocViewModel(location, self));
	});

	self.sortLocations();

	// The map centralizes the first location by default
	map.panTo(self.locations()[0]);
}
