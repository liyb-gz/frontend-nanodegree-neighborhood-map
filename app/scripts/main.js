// JShint directives
/* globals $, google, ko, console */

(function () {
	'use strict';

	var locations; //Model
	var viewModel; //ViewModel
	var map; //View 1
	var markers = []; //View 2

	var AppViewModel = function (locations, map, markers) {
		var self = this;
		self.locations = locations;
		self.map = map;
		self.markers = markers;
		self.currentLocation = ko.observable(self.locations()[0]); //Initially, show the first location
		self.filter = ko.observable('');

		//Compute the locations that needs to be displayed.
		self.filteredLocations = ko.computed(function () {
			return this.locations().filter(function (location) {
				// Compare the location names with the given filter, case insensitively
				return location.name.toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
			});
		}, this);

		self.locations().forEach(function (location) {
			location.isActive = ko.computed(function () {
				return this === self.currentLocation();
			}, location);
		});

		self.resetCurrentLocation = function () {
			self.currentLocation(this);
		};

		self.getCurrentLocation = function () {
			return self.currentLocation();
		};
	};

	// Load locations from the JSON file and preprocess.
	function initLocations(locs) {
		var locations = ko.observableArray(locs);

		// Sort locations by alphabetical order.
		locations().sort(function (a, b) {
			if (a.name > b.name) {
				return 1;
			} else if (a.name < b.name) {
				return -1;
			} else {
				return 0;
			}
		});

		return locations;
	}

	function initMap(initLoc, zoomLevel) {
		var mapDiv = document.getElementById('map');

		var map = new google.maps.Map(mapDiv, {
			center: initLoc.coordinates,
			zoom: zoomLevel
		});

		return map;
	}

	function initMarkers(locations, map) {
		var markers = [];

		locations().forEach(function (location) {
			markers.push(new google.maps.Marker({
				position: location.coordinates,
				map: map,
				title: location.name
			}));
		});

		return markers;
	}

	//Load files and init
	$.when(

		// Load the locations
		$.getJSON('scripts/models/locations.json', function(json) {
			locations = initLocations(json.locations);
			ko.applyBindings(new AppViewModel(locations));
		}),

		// Load the google map
		$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCOvT4WRm8Y1FRgoZZaKo-7M71f1AbNEvI')

	// When both the locations and the google map are loaded, do the following
	).then(function () {
		map = initMap(locations()[0], 12); //Choose the first location to be loaded
		markers = initMarkers(locations, map);
	});

})();