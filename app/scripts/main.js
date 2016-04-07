(function () {
	'use strict';

	var locations; //Model
	var AppViewModel; //ViewModel
	var map; //View 1
	var markers = []; //View 2

	AppViewModel = function (locations) {
		var vm = this;
		this.locations = locations;
		this.currentLocation = ko.observable(this.locations()[0]); //Initially, show the first location
		this.filter = ko.observable('');

		//Compute the locations that needs to be displayed.
		this.filteredLocations = ko.computed(function () {
			return this.locations().filter(function (location) {
				// Compare the location names with the given filter, case insensitively
				return location.name.toLowerCase().indexOf(vm.filter().toLowerCase()) > -1;
			});
		}, this);

		this.resetCurrentLocation = function () {
			vm.currentLocation(this);
		};

		this.locations().forEach(function (location) {
			location.isActive = ko.computed(function () {
				return this === vm.currentLocation();
			}, location);
		});
	}

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

	function initMap() {
		var mapDiv = document.getElementById('map');

		map = new google.maps.Map(mapDiv, {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});

		markers.push(new google.maps.Marker({
			position: {
				lat: 22.332040,
				lng: 114.190232
			},
			map: map,
			title: 'hello!'
		}));

		markers.push(new google.maps.Marker({
			position: {
				lat: 22.352040,
				lng: 114.190232
			},
			map: map,
			title: 'hello!'
		}));
	}

	$.when(

		// Load the locations
		$.getJSON('scripts/models/locations.json', function(json) {
			locations = initLocations(json.locations);
			ko.applyBindings(new AppViewModel(locations));
		}),

		// Load the google map
		$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCOvT4WRm8Y1FRgoZZaKo-7M71f1AbNEvI', function() {
			initMap();
		})

	// When both the locations and the google map are loaded, do the following
	).then(function () {
		console.log('both loc and map loaded');
	});

})();