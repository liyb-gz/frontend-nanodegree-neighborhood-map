(function () {
	'use strict';

	$.getJSON('scripts/models/locations.json', function(json, textStatus) {
		var locations = json.locations;

		function AppViewModel() {
			var vm = this;
			this.locations = ko.observableArray(locations);
			this.filter = ko.observable('');

			//Compute the locations that needs to be displayed.
			this.filteredLocations = ko.computed(function () {
				return vm.locations().filter(function (location) {
					// Compare the location names with the given filter, case insensitively
					return location.name.toLowerCase().indexOf(vm.filter().toLowerCase()) > -1;
				});
			});
		}

		ko.applyBindings(new AppViewModel());
	});

})();