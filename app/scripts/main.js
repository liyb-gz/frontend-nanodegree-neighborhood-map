(function () {
	'use strict';

	$.getJSON('scripts/models/locations.json', function(json) {
		var locations = json.locations;

		function AppViewModel() {
			var vm = this;
			this.locations = loadLocations(locations);
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

		// Load locations from the JSON file.
		function loadLocations(locs) {
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

		ko.applyBindings(new AppViewModel());

		// loadMarkers();
	});

	$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCOvT4WRm8Y1FRgoZZaKo-7M71f1AbNEvI', function(data, textStatus, jqxhr) {
		initMap();
	});

})();