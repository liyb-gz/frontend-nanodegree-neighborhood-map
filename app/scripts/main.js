(function () {
	'use strict';

	$.getJSON('scripts/models/locations.json', function(json, textStatus) {
		var locations = json.locations;

		function AppViewModel() {
			this.locations = ko.observableArray(locations);
			console.log(typeof locations);
			console.log(this.locations());
		}

		ko.applyBindings(new AppViewModel());
	});

})();